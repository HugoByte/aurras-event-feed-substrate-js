import { MicrobootstrapSettings, MicrobootstrapLoader } from '@hugobyte/microbootstrap';
import micro from 'micro';

/**
 * Health Module to check application health for kubernetes
 */

export const HealthModule: MicrobootstrapLoader = (frameworkSettings: MicrobootstrapSettings | undefined) => {
    if (frameworkSettings) {
        const server = micro(() => "OK!");

          server.listen(80);
    }
}