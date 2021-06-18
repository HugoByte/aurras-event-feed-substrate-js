import { Inject } from 'typedi';
import { ChainService, EventService } from '@services/index';
import { EventException } from '@exceptions/index';
import { ErrorHandler } from '@middlewares/error-handler.middleware';
import { log } from 'winston';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { util } from 'config';
import { forkJoin, of } from 'rxjs';

@Inject()
export class EventController {

    constructor(private chainService: ChainService, private eventService: EventService) {
    }

    private handleError(error: any) {
        ErrorHandler.handleError(new EventException(error.message));
    }

    public init() {
        const { excludes, kafkaBrokers, topics, eventReceiver } = util.loadFileConfigs();
        this.chainService.listenForEvents()
            .pipe(
                map(this.eventService.getEvents),
                catchError((error) => {
                    throw new EventException(`${error} from Polkadot API`)
                }),
                map((events) => this.eventService.filterEvents(events, excludes)),
                map((events) => this.eventService.filterTopics(events, topics)),
                filter((events) => events.length > 0),
                switchMap(
                    (events) => forkJoin(
                        events.map(
                            (event) => {
                                return this.eventService.invokeAction({ event, brokers: kafkaBrokers, topic: event.topic, action: eventReceiver })
                                    .pipe(
                                        catchError(error => of(new EventException(`${error} from Openwhisk API`)))
                                    )
                            }
                        )
                    )
                )
            )
            .subscribe(
                (result) => log("info", JSON.stringify(result)),
                this.handleError
            );
    }
}