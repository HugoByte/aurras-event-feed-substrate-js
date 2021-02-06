import { Service } from "typedi";
import { ApiRx } from '@polkadot/api';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Service()
export class ChainService {
    private _api!: Observable<ApiRx>;

    public set api(value) {
        this._api = value
    }

    public get api(): Observable<ApiRx> {
        return this._api;
    }

    public listenForEvents(): Observable<any> {
        return this._api.pipe(
            switchMap((api) => api.query.system.events())
        );
    }
}

export type Api = Observable<ApiRx> | undefined;