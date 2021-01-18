import { Service } from "typedi";
import { forEach, map, find, filter } from 'lodash';
import * as openwhisk from 'openwhisk';
import { from, Observable } from 'rxjs';

@Service()
export class EventService {
    private _openwhiskApi!: openwhisk.Client;

    public set openwhiskApi(value) {
        this._openwhiskApi = value
    }

    public get openwhiskApi(): openwhisk.Client {
        return this._openwhiskApi;
    }

    public getEvents(records): any[] {
        const events: any = [];

        forEach(records, (record) => {
            const { event } = record;
            const types = event.typeDef;

            events.push({
                section: event.section,
                method: event.method,
                meta: event.meta.documentation.toString(),
                data: map(event.data, (value, index) => ({ [types[index].type]: value.toString() }))
            });
        })

        return events;
    }

    public filterEvents(events, excludes): any[] {
        return filter(events, (event) => {
            const sectionToExclude = find(excludes, (exclude: any) => event.section === exclude.section);

            if (sectionToExclude) {
                if (sectionToExclude?.methods === undefined) return false;

                return !find(sectionToExclude.methods, (method: any) => event.method === method);
            }

            return true;
        })
    }

    public triggerEventManager({ brokers, topic, event, trigger }): Observable<{
        activationId: string
    } | undefined> {
        return from(this._openwhiskApi.triggers.invoke({
            name: trigger,
            params: {
                brokers,
                event,
                topic
            }
        }))
    }
}