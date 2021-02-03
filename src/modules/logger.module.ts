import { MicrobootstrapSettings, MicrobootstrapLoader } from '@hugobyte/microbootstrap';
import { configure } from 'winston';
import { util } from 'config';
import { getTransport } from '@helpers/index';
import { reduce } from 'lodash';

/**
 * Logger Module configures logger and adds logging transports. Transports and the logging levels are added through the Environment variable using the format `LOGGER=type,level[,parameters];type,level[,parameters];`. Using https://github.com/winstonjs/winston for logging.
 * Should use a single instance of logger through out the application.
 */

export const LoggerModule: MicrobootstrapLoader = (frameworkSettings: MicrobootstrapSettings | undefined) => {
    if (frameworkSettings) {
        const { chainName, loggers } = util.loadFileConfigs();

        const transports = reduce(loggers, (accumlator: any[], logger, loggerType) => {
            accumlator.push(getTransport(loggerType, logger, chainName));

            return accumlator;
        }, []);

        configure({
            transports,
        });
    }
}