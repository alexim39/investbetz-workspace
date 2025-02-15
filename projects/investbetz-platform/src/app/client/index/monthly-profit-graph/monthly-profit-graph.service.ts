import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface MonthlyProfitGraphInterface {
  month: string;
  profit: string;
}

@Injectable({
  providedIn: 'root'
})
export class MonthylyProfitGraphService {

  constructor(private http: HttpClient) { }

}
