import { MicrobootstrapSettings, MicrobootstrapLoader } from '@hugobyte/microbootstrap';
import { util } from 'config';
import { Container } from 'typedi';
import { WsProvider, ApiRx } from '@polkadot/api';
import { shareReplay } from 'rxjs/operators';
import { ChainService } from '@services/index';
import { has } from 'lodash';

/**
 * Chain Module connects to substrate based chain and provides an observable through service.
 * connection is implemented using the official provided @polkadot/api library.
 */

export const ChainModule: MicrobootstrapLoader = async (frameworkSettings: MicrobootstrapSettings | undefined) => {
    if (frameworkSettings) {
    const { chainEndpoint, types } = util.loadFileConfigs();

    Container.get(ChainService).api = chainProvider({ endpoint: chainEndpoint, types });
    }
}

export const chainProvider = ({ endpoint, types, options }: { endpoint: string, types: any, options?: { reconnect : number | false }}) => {
    const wsOptions: any[] = [];

    if(options && has(options, "reconnect")) {
        wsOptions.push(options.reconnect);
    }

    const wsProvider = new WsProvider(endpoint, ...wsOptions);

    return new ApiRx({
        provider: wsProvider,
        types
    })
        .isReady
        .pipe(
            shareReplay()
        );
}