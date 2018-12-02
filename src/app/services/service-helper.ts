import {Response} from '@angular/http';

export function ExtractData(res: Response): any {
  console.log(res.text());
  //let body = res.json();
  //return body && body.data ? body.data: {};
  return res.text();
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
