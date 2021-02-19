import { MicrobootstrapSettings, MicrobootstrapLoader } from '@hugobyte/microbootstrap';
import { util } from 'config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ConfigurationException } from "@exceptions/index";
import Ajv, { DefinedError } from "ajv"

/**
 * Configuration Module validates the config passed through environment variables with the schema provided in /config/schema.json.
 * Config is parsed and loaded using https://github.com/lorenwest/node-config.
 * Config validation is done using https://github.com/ajv-validator/ajv.
 */

export const ConfigurationModule: MicrobootstrapLoader = (frameworkSettings: MicrobootstrapSettings | undefined) => {
    if (frameworkSettings) {
        try {
            const schema = JSON.parse(readFileSync(join('config', 'schema.json'), { encoding: 'utf8' }));
            const configuration = util.loadFileConfigs();

            validateConfiguration({ schema, configuration });
        }
        catch (error) {
            if (typeof error === 'string') throw new ConfigurationException("", error);
            throw new ConfigurationException(error.dataPath, error.message);
        }
    }
}

export const validateConfiguration = ({ schema, configuration }) => {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const isValidConfiguration = validate(configuration);

    if (!isValidConfiguration) {
        for (const error of validate.errors as DefinedError[]) {
            throw error;
        }
    }
    return isValidConfiguration;
}