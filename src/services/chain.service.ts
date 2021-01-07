import { Service } from "typedi";
import { ApiRx } from '@polkadot/api';
import { Observable } from 'rxjs';

@Service()
export class ChainService {
    private api!: Observable<ApiRx>;

    public set Api(value) {
        this.api = value
    }
}