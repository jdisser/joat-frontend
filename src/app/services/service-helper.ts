import {Response} from '@angular/http';

export function ExtractData(event: Event): any {
  console.log(event);
  //let body = res.json();
  //return body && body.data ? body.data: {};
  return event;
}


export function ExtractObject(res: Response): any {
  console.log(res.text());
  let body = res.json();
  return body && body.data ? body.data: {};
}

export function HandleError(error: any): Promise<any>{
  console.log(error);
  return Promise.reject(error);
}
