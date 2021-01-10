import { Observable } from 'rxjs';
import { WsProvider, ApiRx, ApiPromise } from '@polkadot/api';
import { EventService, ChainService } from '../src/services';

function createRxApi(): Observable<ApiRx> {
    jest.setTimeout(30000);

    const provider = new WsProvider('ws://localhost:9944');
    
    return new ApiRx({ provider }).isReady;
}

function createApi(): Promise<ApiPromise> {
    jest.setTimeout(30000);

    const provider = new WsProvider('ws://localhost:9944');

    return new ApiPromise({ provider }).isReady;
}

describe('Events Module Unit Tests', () => {
    test('Can get instance of Observable from chain service', async () => {
        const chainService = new ChainService();
        chainService.api = createRxApi();

        expect(chainService.api).toBeInstanceOf(Observable);

        (await chainService.api.toPromise()).disconnect();
    });

    test('Can listen to events from the chain', (done) => {
        const chainService = new ChainService();
        chainService.api = createRxApi();

        chainService.listenForEvents().subscribe(async (events) => {
            expect(events).toBeTruthy();

            (await chainService.api.toPromise()).disconnect();

            done();
        })
    });

    test('Can extract events from the chain', async () => {
        const api = await createApi();
        const events = api.query.system.events();
        const eventService = new EventService();

        expect(eventService.getEvents(events)).toBeTruthy();

        api.disconnect();
    });

    test('Can filter events from all methods of the section', async () => {
        const eventService = new EventService();
        const mockEvents = [
            { "section": "system", "method": "ExtrinsicSuccess" },
            { "section": "system", "method": "ExtrinsicFailed" },
            { "section": "balance", "method": "ExtrinsicFailed" },
        ];
        const excludes = [{
            "section": "system",
            "methods": undefined
        }];

        expect(eventService.filterEvents(mockEvents, excludes)).toStrictEqual([
            { "section": "balance", "method": "ExtrinsicFailed" }
        ]);
    });

    test('Can filter events from specific methods of the section', async () => {
        const eventService = new EventService();
        const mockEvents = [
            { "section": "system", "method": "ExtrinsicSuccess" },
            { "section": "system", "method": "ExtrinsicFailed" },
            { "section": "balance", "method": "ExtrinsicFailed" },
        ];
        const excludes = [{
            "section": "system",
            "methods": [
                "ExtrinsicFailed"
            ]
        }];

        expect(eventService.filterEvents(mockEvents, excludes)).toStrictEqual([
            { "section": "system", "method": "ExtrinsicSuccess" },
            { "section": "balance", "method": "ExtrinsicFailed" }
        ]);
    });
});