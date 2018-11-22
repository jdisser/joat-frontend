import {Injectable} from "@angular/core";
import {Event} from "../models/event";

@Injectable()
export class EventService{
  get(): Promise<Event[]>{
    return Promise.resolve([
      {id: "1", start_date: "2018-11-22 09:00", end_date: "2018-11-22 11:00", text: "Get Turkey"},
      {id: "2", start_date: "2018-11-22 12:00", end_date: "2018-11-22 16:00", text: "Cook Turkey"}
    ]);
  }
}
