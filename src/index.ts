import 'reflect-metadata';
import { bootstrapMicroframework } from 'microbootstrap';
import { LoggerModule, ConfigurationModule, ChainModule } from '@modules/index';
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
        ChainModule
    ],
})
    .then((framework) => {
        log("info", "Started");
    })
    .catch(ErrorHandler.handleError);