import { MicroframeworkSettings, MicroframeworkLoader } from 'microbootstrap';
import { util } from 'config';
import { buildYup } from 'schema-to-yup';
import * as jsonSchema from '../../config/schema.json';
import { ConfigurationException } from "@exceptions";

/**
 * Configuration Module validates the config passed through environment variables with the schema provided in /config/schema.json.
 * Config is parsed and loaded using https://github.com/lorenwest/node-config.
 * Config validation is done using https://github.com/jquense/yup.
 */

export const ConfigurationModule: MicroframeworkLoader = (frameworkSettings: MicroframeworkSettings | undefined) => {
    if (frameworkSettings) {
        // Build Yup schema from the provided json schema.
        const yupSchema = buildYup(jsonSchema, {});

        // Using synchronous validation as we need to be sure that configuration are valid before loading other modules.
        try { yupSchema.validateSync(util.loadFileConfigs()) }
        catch (error) { throw new ConfigurationException(error.message); }
    }
}