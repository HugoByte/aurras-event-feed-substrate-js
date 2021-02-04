import 'reflect-metadata';
import { Bootstrap } from '@hugobyte/microbootstrap';
import { LoggerModule, ConfigurationModule, ChainModule, EventModule, HealthModule } from '@modules/index';
import { log } from 'winston';
import { ErrorHandler } from '@middlewares/index';

Bootstrap({
    config: {
        logo: 'Event Feed',
        showBootstrapTime: true
    },
    loaders: [
        ConfigurationModule,
        LoggerModule,
        ChainModule,
        EventModule,
        HealthModule
    ],
})
    .then((framework) => {
        log("info", "Started");
    })
    .catch(ErrorHandler.handleError);