import { ConfigurationModule, validateConfiguration } from '../src/modules/configuration.module';
import { ConfigurationException } from '../src/exceptions';
import { MicroframeworkSettings } from 'microbootstrap';

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
        expect(() => configuration(new MicroframeworkSettings(null))).toBeTruthy();
    });

    test('Should throw error for invalid configuration format', () => {
        expect(() => configuration(new MicroframeworkSettings(null))).toThrow(ConfigurationException);
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

        expect(validateConfiguration({ schema, configuration })).toStrictEqual({
            chainEndpoint: "wss://localhost"
        })
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
    })
});

