import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework-w3tec';
import { LoggerModule } from '@modules';
import * as winston from 'winston';
bootstrapMicroframework({
    loaders: [
        LoggerModule
    ],
})
    .then((framework) => {
        winston.log("info", "Started");
    })
    .catch(error => {
        winston.log("error", error)
    });