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
                meta: event.meta.docs.toString(),
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

    public filterTopics(events, topics): any[] {
        return filter(map(events, (event) => {
            const topic = find(topics, (item: any) => event.section === item.section);
            if (topic) event.topic = topic.topic;

            return event;
        }), (event) => event.topic !== undefined)
    }

    public invokeAction({ brokers, topic, event, action, eventProcessor }): Observable<openwhisk.Dict | undefined> {
        return from(this._openwhiskApi.actions.invoke({
            name: action,
            params: {
                brokers,
                event: JSON.stringify(event),
                topic,
                eventProcessor
            }
        }))
    }
}