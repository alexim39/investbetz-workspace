import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface DailyProfitGraphInterface {
  daily: string;
  profit: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfitGraphService {

  constructor(private http: HttpClient) { }

}
