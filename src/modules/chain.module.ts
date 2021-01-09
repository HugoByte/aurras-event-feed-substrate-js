import { MicroframeworkSettings, MicroframeworkLoader } from 'microbootstrap';
import { get } from 'config';
import { Container } from 'typedi';
import { WsProvider, ApiRx } from '@polkadot/api';
import { shareReplay } from 'rxjs/operators';
import { ChainService } from '@services/index';
import { has } from 'lodash';

/**
 * Chain Module connects to substrate based chain and provides an observable through service.
 * connection is implemented using the official provided @polkadot/api library.
 */

export const ChainModule: MicroframeworkLoader = async (frameworkSettings: MicroframeworkSettings | undefined) => {
    if (frameworkSettings) {
        const endpoint = get("chainEndpoint") as string;

        Container.get(ChainService).api = chainProvider({ endpoint });
    }
}

export const chainProvider = ({ endpoint, options }: { endpoint: string, options?: { reconnect : number | false }}) => {
    const wsOptions: any[] = [];

    if(options && has(options, "reconnect")) {
        wsOptions.push(options.reconnect);
    }
    
    const wsProvider = new WsProvider(endpoint, ...wsOptions);

    return new ApiRx({
        provider: wsProvider
    })
        .isReady
        .pipe(
            shareReplay()
        );
}