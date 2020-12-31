import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework-w3tec';
import { configure, format, transports } from 'winston';

export const LoggerModule: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
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
                }),
                // TODO: Add Winston Kafka Transport for Error Notification
            ],
        });
    }
}