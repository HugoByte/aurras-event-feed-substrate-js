import { EventService } from '../src/services';

describe('Events Module Unit Tests', () => {
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

    test('Can extract event from the block records', () => {
        const eventService = new EventService();
        const mockRecord = [
            {
                "event": {
                    "section": "system",
                    "method": "ExtrinsicSuccess",
                    "meta": {
                        "documentation": "Test event"
                    },
                    "typeDef": [{ displayName: undefined, info: 6, name: undefined, type: 'DispatchInfo' }],
                    "data": [{ toString: () => '{ "weight": 159133000, "class": "Mandatory", "paysFee": "Yes" }' }]
                }
            }
        ]

        expect(eventService.getEvents(mockRecord)).toStrictEqual([{
            "data": [{
                "DispatchInfo": '{ "weight": 159133000, "class": "Mandatory", "paysFee": "Yes" }'
            }],
            "meta": "Test event",
            "method": "ExtrinsicSuccess",
            "section": "system"
        }]);
    })
});