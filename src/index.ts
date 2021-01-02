import 'reflect-metadata';
import { bootstrapMicroframework } from 'microbootstrap';
import { LoggerModule, ConfigurationModule } from '@modules';
import { log } from 'winston';
bootstrapMicroframework({
    config: {
        logo: 'Event Feed',
        showBootstrapTime: true
    },
    loaders: [
        ConfigurationModule,
        LoggerModule,
    ],
})
    .then((framework) => {
        log("info", "Started");
    })
    .catch(error => {
        log("error", error)
    });