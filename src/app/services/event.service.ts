import {Injectable} from "@angular/core";
import {Event} from "../models/event";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ExtractData, HandleError, ExtractObject} from "./service-helper";
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { catchError } from "rxjs/internal/operators/catchError";

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};


@Injectable()
export class EventService{

  private eventUrl = "api/events";

  constructor(private http: HttpClient) {}

  get(): Observable<Event[]>{
    console.log("In get service...");
    return this.http.get<Event[]>(this.eventUrl)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
      );

  }

  insert(event: Event): Observable<Event> {
    console.log("In insert service...");
    console.log(event);
    return this.http.post<Event>(this.eventUrl, event)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
      );

  }

  update(event: Event): Observable<null | Event> {
    console.log("In update service...");
    console.log("url: " + `${this.eventUrl}/${event.id}`);
    return this.http.put<Event>(`${this.eventUrl}/${event.id}`, event, cudOptions)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  remove(id: number): Observable<Object> {
    console.log("In remove service...");
    console.log("Removing id: " + id);
    return this.http.delete(`${this.eventUrl}/${id}`)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  private handleError(error: any){
    //console.error(error);
    return throwError(error);
  }

}
