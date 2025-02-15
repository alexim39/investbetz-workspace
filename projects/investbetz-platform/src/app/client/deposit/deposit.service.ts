import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class DepositService {

  constructor() { }

  // generate deposit transaction id
  public generateDepositId(): number{
    return 1 + Math.floor(Math.random() * 999999999);
    //return Math.random().toString(36).substr(2, 9);
  }

}