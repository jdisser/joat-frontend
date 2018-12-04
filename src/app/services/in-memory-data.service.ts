import { InMemoryDbService } from "angular-in-memory-web-api";
import {Event} from "../models/event";

export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    let events = [
      {id: 1, start_date: "2018-12-04 09:00", end_date: "2018-12-04 11:00", text: "Get Turkey"},
      {id: 2, start_date: "2018-12-04 12:00", end_date: "2018-12-04 16:00", text: "Cook Turkey"}
    ];
    return {events};
  }

  genId(events: Event[]): number {
    return events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 11;
  }
}
