import { chainProvider } from '../src/modules/chain.module';
import { Observable } from 'rxjs'

describe('Chain Module Unit Tests', () => {
    test('Can get instance of observable', () => {
        expect(chainProvider({ endpoint: "ws://localhost:9944", types: undefined, options: { reconnect: false }})).toBeInstanceOf(Observable);
    });
});