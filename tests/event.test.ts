import { Observable, from } from 'rxjs';
import { WsProvider, ApiRx, ApiPromise } from '@polkadot/api';
import { EventService, ChainService } from '../src/services';
import openwhisk from 'openwhisk';
import { switchMap, delay } from 'rxjs/operators';

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
    test('Can get instance of Observable from chain service', async (done) => {
        const chainService = new ChainService();
        chainService.api = createRxApi();

        expect(chainService.api).toBeInstanceOf(Observable);

        (await chainService.api.toPromise()).disconnect();
        done();
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

    test('Can extract events from the chain', async (done) => {
        const api = await createApi();
        const events = api.query.system.events();
        const eventService = new EventService();

        expect(eventService.getEvents(events)).toBeTruthy();

        api.disconnect();
        done();
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

    test('Can filter events from specific methods of the section', async (done) => {
        const eventService = new EventService();
        const openwhiskApi = openwhisk({ apihost: "http://localhost:3233", api_key: "23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP", namespace: "guest" });
        const event = {
            section: "system",
            method: "ExtrinsicSuccess",
            data: [{
                DispatchInfo: JSON.stringify({
                    weight: 159133000,
                    class: "Mandatory"
                })
            }]
        }
        eventService.openwhiskApi = openwhiskApi;
        eventService.triggerEventManager({ brokers: ["localhost:9092"], topic: "subsrate", event, trigger: "receive-event" })
            .pipe(
                delay(1000),
                switchMap((response: any) => from(openwhiskApi.activations.logs({ name: response.activationId }))),
                delay(1000),
                switchMap((response: any) => from(openwhiskApi.activations.result({ name: JSON.parse(response.logs[0]).activationId })))
            )
            .subscribe((response) => {
                expect(response.result).toStrictEqual({
                    brokers: ['localhost:9092'],
                    message: 'Event Recieved from system',
                    topic: 'subsrate',
                    event: {
                        section: "system", 
                        method: "ExtrinsicSuccess", 
                        data: [{
                            DispatchInfo: "{\"weight\":159133000,\"class\":\"Mandatory\"}"
                        }]
                    }
                })
                done();
            })
    });
});