import 'reflect-metadata';
import { bootstrapMicroframework } from 'microbootstrap';
import { LoggerModule, ConfigurationModule } from '@modules/index';
import { log } from 'winston';
import { ErrorHandler } from '@middlewares/index';

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
    .catch(ErrorHandler.handleError);