import { MicroframeworkSettings, MicroframeworkLoader } from 'microbootstrap';
import { Container } from 'typedi';
import { EventController } from '@controllers/index';

/**
 * Event Module initializes event controller
 */

export const EventModule: MicroframeworkLoader = (frameworkSettings: MicroframeworkSettings | undefined) => {
    if (frameworkSettings) {
        Container.get(EventController).init()
    }
};