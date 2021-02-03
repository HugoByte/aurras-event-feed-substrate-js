import { Exception, ConfigurationException } from '@exceptions/index';
import { createLogger, transports, format, log } from "winston";

/**
 * Central Error Handling Logic.
 */

class ErrorHandlerMiddleware {
    public async handleError(error: Exception): Promise<void> {
        // Build a custom logger to handle configuration error as the logger transports will be added only after the validating the configration. Without this winston will throw `Attempt to write logs with no transports`.
        if(error instanceof ConfigurationException) {
            const logger = createLogger(
                {
                    transports: [
                        new transports.Console({
                            level: "error",
                            handleExceptions: true,
                            format: format.combine(
                                format.label({ label: 'Configuration'}),
                                format.colorize(),
                                format.timestamp({format: 'DD-MM-YYYY hh:mm:ss a'}),
                                format.printf(({ level, message, label, timestamp}) => `${timestamp} [${label}] ${level}: ${message}`),
                            )
                        })
                    ],
                }
            );

            logger.log("error", error.message);
        } else {
            // Use Configured logger
            log("error", error.message);
        }

        // Exit the process if the error is not operational.
        // TODO: Emit event and shutdown process through bootstrap framework to handle shutdown handlers.
        if(!error.isOperational) {
            return process.exit(1);
        }
    }
}

export const ErrorHandler = new ErrorHandlerMiddleware();