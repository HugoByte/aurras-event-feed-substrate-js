import { Service } from "typedi";
import { forEach, map } from 'lodash';

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
}