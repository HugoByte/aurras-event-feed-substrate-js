import { MicroframeworkSettings, MicroframeworkLoader } from 'microbootstrap';
import { util } from 'config';
import { buildYup } from 'schema-to-yup';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ConfigurationException } from "@exceptions/index";

/**
 * Configuration Module validates the config passed through environment variables with the schema provided in /config/schema.json.
 * Config is parsed and loaded using https://github.com/lorenwest/node-config.
 * Config validation is done using https://github.com/jquense/yup.
 */

export const ConfigurationModule: MicroframeworkLoader = (frameworkSettings: MicroframeworkSettings | undefined) => {
    if (frameworkSettings) {
        try {
            // Read schema.json file from config directory.
            const schema = JSON.parse(readFileSync(join('config', 'schema.json'), { encoding: 'utf8' }));

            // Build Yup schema from the provided json schema.
            const yupSchema = buildYup(schema, {});

            // Using synchronous validation as we need to be sure that configuration are valid before loading other modules.
            yupSchema.validateSync(util.loadFileConfigs());
        }
        catch (error) {
            if(typeof error === 'string') throw new ConfigurationException(error);
            throw new ConfigurationException(error.message);
        }
    }
}