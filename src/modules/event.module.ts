import { MicrobootstrapSettings, MicrobootstrapLoader } from '@hugobyte/microbootstrap';
import { Container } from 'typedi';
import { EventController } from '@controllers/index';

/**
 * Event Module initializes event controller
 */

export const EventModule: MicrobootstrapLoader = (frameworkSettings: MicrobootstrapSettings | undefined) => {
    if (frameworkSettings) {
        Container.get(EventController).init()
    }
};