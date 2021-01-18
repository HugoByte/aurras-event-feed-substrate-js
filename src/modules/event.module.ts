import { MicrobootstrapSettings, MicrobootstrapLoader } from '@hugobyte/microbootstrap';
import { Container } from 'typedi';
import { EventController } from '@controllers/index';
import { util } from 'config';
import { EventService } from '@services/index';
import openwhisk from 'openwhisk';

/**
 * Event Module initializes event controller
 */

export const EventModule: MicrobootstrapLoader = (frameworkSettings: MicrobootstrapSettings | undefined) => {
    if (frameworkSettings) {
        const { openwhiskApiHost, openwhiskApiKey, openwhiskNamespace } = util.loadFileConfigs();

        Container.get(EventService).openwhiskApi = openwhisk({ apihost: openwhiskApiHost, api_key: openwhiskApiKey, namespace: openwhiskNamespace});
        Container.get(EventController).init()
    }
};