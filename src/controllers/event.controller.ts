import { Inject } from 'typedi';
import { ChainService, EventService } from '@services/index';
import { EventException } from '@exceptions/index';
import { ErrorHandler } from '@middlewares/error-handler.middleware';
import { log } from 'winston';
import { map, filter, switchMap } from 'rxjs/operators';
import { util } from 'config';
import { forkJoin } from 'rxjs';

@Inject()
export class EventController {

    constructor(private chainService: ChainService, private eventService: EventService) {
    }

    private handleError(error: any) {
        ErrorHandler.handleError(new EventException(error.message));
    }

    public init() {
        const { excludes } = util.loadFileConfigs();
        this.chainService.listenForEvents()
            .pipe(
                map(this.eventService.getEvents),
                map((events) => this.eventService.filterEvents(events, excludes)),
                filter((events) => events.length > 0),
                switchMap((events) => forkJoin(events.map((event) => this.eventService.triggerEventManager(event))))
            )
            .subscribe(
                (result) => log("info", JSON.stringify(result)),
                this.handleError
            );
    }
}