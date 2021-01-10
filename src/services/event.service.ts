import { Service } from "typedi";
import { forEach, map, find, filter } from 'lodash';

@Service()
export class EventService {
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
}