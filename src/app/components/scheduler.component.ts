import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import "dhtmlx-scheduler";
//import {} from "@types/dhtmlxscheduler";
import {EventService} from "../services/event.service";
import {Event} from "../models/event";
declare let scheduler: any;   //added this and removed @types for testing

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  styleUrls: ['scheduler.component.css'],
  templateUrl: 'scheduler.component.html',
  providers: [EventService]
})

export class SchedulerComponent implements OnInit {
  @ViewChild("scheduler_here") schedulerContainer: ElementRef;

  constructor(private eventService: EventService){}



  ngOnInit(){
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.init(this.schedulerContainer.nativeElement);

    scheduler.attachEvent("onEventAdded", (id, ev) => {
      this.eventService.insert(this.serializeEvent(ev, true))
        .subscribe((event: Event) => {
          if(event.id != id) {
            console.log("changing event id");
            scheduler.changeEventId(id, event.id.toString());  //<<---- id is string in scheduler!!!
          }
        })
    });

    scheduler.attachEvent("onEventChanged", (id, ev) => {
      console.log("in update event handler lambda...");
      console.log(ev);
      this.eventService.update(this.serializeEvent(ev))
        .subscribe((data: any) => {
          console.log("from db: " + data);
        });
    });

    scheduler.attachEvent("onEventDeleted", (id) => {
      this.eventService.remove(id)
        .subscribe((data: any) => {
          console.log("from db: " + data);
        });
    });

    this.eventService.get()
      .subscribe((data) => {
        scheduler.parse(data, "json");
      });
  }

  private serializeEvent(data: any, insert: boolean = false): Event {
    const result = {};

    for (let i in data){
      if(i.charAt(0) == "$" || i.charAt(0) == "_")
        continue;
      if(insert && i == "id")
        continue;
      if(data[i] instanceof Date){
        result[i] = scheduler.templates.xml_format(data[i]);
      } else {
          if(i == "id"){                //dhtmlx stores the id as a string!!!
            data[i] = Number(data[i]);
          }
          result[i] = data[i];
      }
    }
    return result as Event;
  }
}
