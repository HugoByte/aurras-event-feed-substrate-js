import { MicroframeworkSettings, MicroframeworkLoader } from 'microbootstrap';
import { configure, format, transports } from 'winston';

/**
 * Logger Module configures logger and adds logging transports. Transports and the logging levels are added through the Environment variable using the format `LOGGER=type,level[,parameters];type,level[,parameters];`. Using https://github.com/winstonjs/winston for logging.
 * Should use a single instance of logger through out the application.
 */

export const LoggerModule: MicroframeworkLoader = (frameworkSettings: MicroframeworkSettings | undefined) => {
    if (frameworkSettings) {
        // TODO: Build transports using configuration provided through environment variable.
        // Configure the logger
        configure({
            transports: [
                new transports.Console({
                    level: "info",
                    handleExceptions: true,
                    format: format.combine(
                        format.label({ label: 'Substrate Event Feed'}),
                        format.colorize(),
                        format.timestamp({format: 'DD-MM-YYYY hh:mm:ss a'}),
                        format.printf(({ level, message, label, timestamp}) => `${timestamp} [${label}] ${level}: ${message}`),
                    )
                })
                // TODO: Add Custom Transport to Logging service for Monitoring
            ],
        });
    }
}