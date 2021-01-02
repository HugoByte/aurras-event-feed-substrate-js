import { BaseException, InvalidConfigurationException } from '@exceptions';
import { createLogger, transports, format } from "winston";
/**
 * Central Error Handling Logic.
 */
class ErrorHandlerMiddleware {
    public async handleError(err: BaseException): Promise<void> {
        // Build a custom logger to handle configuration error as the logger transports will be added only after the validating the configration. Without this winston will throw `Attempt to write logs with no transports`.
        if(err instanceof InvalidConfigurationException) {
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
            logger.log("error", err.message);
        }
        // Exit the process if the error is not operational.
        // TODO: Emit event and shutdown process through bootstrap framework to handle shutdown handlers.
        if(!err.isOperational) {
            return process.exit(1);
        }
    }
}
export const ErrorHandler = new ErrorHandlerMiddleware();