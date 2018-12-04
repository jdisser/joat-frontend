export class Event {
  id: number;             //NOTE!!! DHTMLX Scheduler stores the id as a string internally!!!!!
  start_date: string;
  end_date: string;
  text: string;
}


//Data sourced from or sent to the scheduler uses a string for the id!!!!!!
