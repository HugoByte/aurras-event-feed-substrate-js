import { chainProvider } from '../src/modules/chain.module';
import { Observable } from 'rxjs'
import { ChainService } from '../src/services/chain.service';

describe('Chain Module Unit Tests', () => {
    test('Can get instance of observable', () => {
        let chainService = new ChainService();
        chainService.api = chainProvider({ endpoint: "ws://localhost:9944", types: undefined, options: { reconnect: false }});

        expect(chainService.api).toBeInstanceOf(Observable);
    });
});