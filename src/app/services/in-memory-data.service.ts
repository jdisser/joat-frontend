import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    let events = [
      {id: "1", start_date: "2018-11-22 09:00", end_date: "2018-11-22 11:00", text: "Get Turkey"},
      {id: "2", start_date: "2018-11-22 12:00", end_date: "2018-11-22 16:00", text: "Cook Turkey"}
    ];
    return {events};
  }
}
