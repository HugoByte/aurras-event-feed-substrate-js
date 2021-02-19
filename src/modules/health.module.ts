import { MicrobootstrapSettings, MicrobootstrapLoader } from '@hugobyte/microbootstrap';
import micro from 'micro';
import { util } from 'config';

/**
 * Health Module to check application health for kubernetes
 */

export const HealthModule: MicrobootstrapLoader = (frameworkSettings: MicrobootstrapSettings | undefined) => {
    if (frameworkSettings) {
        const { healthAPIPort } = util.loadFileConfigs();

        const server = micro(() => "OK!");

          server.listen(healthAPIPort);
    }
}