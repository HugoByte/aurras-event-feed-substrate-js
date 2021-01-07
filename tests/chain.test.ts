import { chainProvider } from '../src/modules/chain.module';
import { Observable } from 'rxjs'

describe('Chain module unit tests', () => {
    test('Protocol of the chain endpoint property should be valid', () => {
        expect(chainProvider({ endpoint: "wss://localhost", options: { reconnect: false }})).toBeInstanceOf(Observable);
    });
});