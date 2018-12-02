import {Injectable} from "@angular/core";
import {Event} from "../models/event";
import {HttpClient} from "@angular/common/http";
import {ExtractData, HandleError, ExtractObject} from "./service-helper";



@Injectable()
export class EventService{

  private eventUrl = "api/events";

  constructor(private http: HttpClient) {}

  get(): Promise<Event[]>{
    console.log("In get service...");
    return this.http.get(this.eventUrl)
      .toPromise()
      .then(ExtractData)
      .catch(HandleError);
  }

  insert(event: Event): Promise<Event> {
    console.log("In insert service...");
    console.log(JSON.stringify(event));
    return this.http.post(this.eventUrl, JSON.stringify(event))
      .toPromise()
      .then(ExtractData)
      .catch(HandleError);
  }

  update(event: Event): Promise<void> {
    console.log("In update service...");
    console.log(JSON.stringify(event));
    return this.http.put('${this.eventUrl}/${event.id}', JSON.stringify(event))
      .toPromise()
      .then(ExtractData)
      .catch(HandleError);
  }

  remove(id: number): Promise<void> {
    console.log("In remove service...");
    console.log("Removing id: " + id);
    return this.http.delete('${this.eventUrl}/${id}')
      .toPromise()
      .then(ExtractData)
      .catch(HandleError);
  }

}
