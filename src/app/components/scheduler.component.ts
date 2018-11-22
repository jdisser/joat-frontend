import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import "dhtmlx-scheduler";
import {} from "@types/dhtmlxscheduler";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  styleUrls: ['scheduler.component.css'],
  templateUrl: 'scheduler.component.html'
})

export class SchedulerComponent implements OnInit {
  @ViewChild("scheduler_here") schedulerContainer: ElementRef;

  ngOnInit(){
    scheduler.init(this.schedulerContainer.nativeElement, new Date());
  }
}
