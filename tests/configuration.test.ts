import { ConfigurationModule, validateConfiguration } from '../src/modules/configuration.module';
import { ConfigurationException, LoggerException } from '../src/exceptions';
import { MicrobootstrapSettings } from '@hugobyte/microbootstrap';
import { loggersHelper, excludesHelper, typesHelper, kafkaBrokersHelper, topicsHelper } from '../config/helper';
import { getTransport } from '../src/helpers/logger.helper';
import { transports } from 'winston';


const configuration = ConfigurationModule;

describe('Configuration Unit Tests', () => {
    beforeEach(() => {
        process.env.CHAIN_NAME = undefined;
        process.env.CHAIN_ENDPOINT = undefined;
        process.env.LOGGERS = undefined;
    });

    test('Should validate configuration for valid format', () => {
        process.env.CHAIN_NAME = "chainname";
        process.env.CHAIN_ENDPOINT = "wss://localhost:9090";
        process.env.LOGGERS = "console,info;file,error,location";
        expect(() => configuration(new MicrobootstrapSettings(null))).toBeTruthy();
    });

    test('Should throw error for invalid configuration format', () => {
        expect(() => configuration(new MicrobootstrapSettings(null))).toThrow(ConfigurationException);
    });
});

describe('Validate schema configuration', () => {
    test('Protocol of the chain endpoint property should be valid', () => {
        const schema = {
            $schema: "http://json-schema.org/draft-07/schema#",
            $id: "http://example.com/person.schema.json",
            type: "object",
            properties: {
                chainEndpoint: {
                    title: "Chain endpoint",
                    description: "Websocket endpoint of the chain node",
                    type: "string",
                    pattern: "^(ws|wss)://"
                }
            }
        }
        const configuration = {
            chainEndpoint: "wss://localhost"
        }

        expect(validateConfiguration({ schema, configuration })).toStrictEqual(true)
    });

    test('Protocol of the chain endpoint property should be invalid', () => {
        const schema = {
            $schema: "http://json-schema.org/draft-07/schema#",
            $id: "http://example.com/person.schema.json",
            type: "object",
            properties: {
                chainEndpoint: {
                    title: "Chain endpoint",
                    description: "Websocket endpoint of the chain node",
                    type: "string",
                    pattern: "^(ws|wss)://"
                }
            }
        }
        const configuration = {
            chainEndpoint: "https://localhost"
        }

        expect(() => validateConfiguration({ schema, configuration })).toThrow();
    });
});

describe('Configuration Helper Unit Tests', () => {
    test('Can parse the empty logger configuration', () => {
        expect(loggersHelper(undefined)).toStrictEqual({ });
    });

    test('Can parse the console logger configuration', () => {
        expect(loggersHelper("console,error")).toStrictEqual({
            console: {
                enabled: true,
                level: "error"
            }
        });
    });

    test('Can parse file logger configuration and log location', () => {
        expect(loggersHelper("file,error,c:/logs,")).toStrictEqual({
            file: {
                enabled: true,
                level: "error",
                filename: "c:/logs"
            }
        });
    });

    test('Can parse empty excludes in configuration', () => {
        expect(excludesHelper(undefined)).toStrictEqual([]);
    });

    test('Can parse the section to exclude', () => {
        expect(excludesHelper("balances")).toStrictEqual([{
            section: "balances",
            methods: undefined
        }]);
    });

    test('Can parse the section and methods', () => {
        expect(excludesHelper("balances=transfer,accounts,;")).toStrictEqual([{
            section: "balances",
            methods: [
                "transfer",
                "accounts"
            ]
        }]);
    });

    test('Can read the custom types', () => {
        expect(typesHelper("tests/mock/types.json")).toStrictEqual({
            Address: "AccountId",
            LookupSource: "AccountId"
        });
    })

    test('Can throw error for invalid JSON', () => {
        expect(() => typesHelper("tests/mock/types-invalid.json")).toThrow();
    })

    test('Can return undefined for unavailable file', () => {
        expect(typesHelper("tests/mock/types-unavailable.json")).toEqual(undefined);
    })

    test('Can return empty array if no broker configuration provided', () => {
        expect(kafkaBrokersHelper(undefined)).toStrictEqual([]);
    })

    test('Can parse the string and return array of brokers from the broker configuration provided', () => {
        expect(kafkaBrokersHelper("kafka:9091;kafka:9092;kafka:9093;")).toStrictEqual([
            "kafka:9091",
            "kafka:9092",
            "kafka:9093"
        ]);
    })

    test('Can parse the string and return array of section topic map from the topic configuration provided', () => {
        expect(topicsHelper("balance=123456;system=56789;")).toStrictEqual([{
            "section": "balance",
            "topic": "123456",
        },
        {
            "section": "system",
            "topic": "56789",
        }]);
    })
});

describe('Logger Helper Unit Tests', () => {
    test('Can throw error if logger transport provided is invalid', () => {
        expect(() => getTransport('invalid', { }, 'label')).toThrow(LoggerException);
    });

    test('Can return console transport', () => {
        expect(getTransport('console', {
            level: "info"
        }, 'label')).toBeInstanceOf(transports.Console);
    });
});