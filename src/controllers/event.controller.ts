import { Inject } from 'typedi';
import { ChainService, EventService } from '@services/index';
import { EventException } from '@exceptions/index';
import { ErrorHandler } from '@middlewares/error-handler.middleware';
import { log } from 'winston';
import { map, filter } from 'rxjs/operators';
import { util } from 'config';

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
                filter((events) => events.length > 0)
            )
            .subscribe(
                (result) => log("info", JSON.stringify(result)),
                this.handleError
            );
    }
}