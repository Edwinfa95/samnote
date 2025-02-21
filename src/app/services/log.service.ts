import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  register(type:string, details:any){
    let title = `Error type ${type}:`;
    console.log(title);
    console.log(details);
  }

}
