import { format, transports } from 'winston';
import { LoggerException } from '@exceptions/index';
import { merge } from 'lodash';

const transportMap = {
    file: transports.File,
    console: transports.Console
};

export function getTransport(type: string, options: any, loggerLabel: string) {
    if (!transportMap[type]) {
        throw new LoggerException(`Invalid logger transport: ${type}`);
    }

    return new transportMap[type](merge(options, {
        handleExceptions: true,
        format: format.combine(
            format.label({ label: loggerLabel }),
            format.colorize(),
            format.timestamp({ format: 'DD-MM-YYYY hh:mm:ss a' }),
            format.printf(({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`),
        )
    }));
}