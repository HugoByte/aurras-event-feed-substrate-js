import { Inject } from 'typedi';
import { ChainService, EventService } from '@services/index';
import { EventException } from '@exceptions/index';
import { ErrorHandler } from '@middlewares/error-handler.middleware';
import { log } from 'winston';
import { map } from 'rxjs/operators';

@Inject()
export class EventController {

    constructor(private chainService: ChainService, private eventService: EventService) {
    }

    private handleError(error: any) {
        ErrorHandler.handleError(new EventException(error.message));
    }

    public init() {
        this.chainService.listenForEvents()
            .pipe(
                map(this.eventService.getEvents)
            )
            .subscribe(
                (result) => log("info", JSON.stringify(result)),
                this.handleError
            );
    }
}