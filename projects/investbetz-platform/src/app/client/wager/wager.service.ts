import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { InvestmntInterface } from './../investmnt/investmnt.interface';

const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({
  'Content-Type': 'application/json'
  })
};

@Injectable({
    providedIn: 'root'
})
export class WagerService {

  private domain = `http://localhost:8383`;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occured. Handle accordingly
        // console.error('An error occured:', error.error.message);
        return throwError(`Request failed due to network error, please try again`);
    } else {
        // Backend returned an unsuccessful response code.
        // The repsonse body contains clues as to what went wrong
        //console.error(`Backend error code: ${error.status}, backend message: ${error.error}`);
        return throwError(error);
    }
    // Return an observable with user-facing error msg
    // return throwError(`Something went wrong, please try again.`)
  }

  public getMorningOdds() {

    const morningWagerUrl = `${this.domain}/api/Clients/wagers/morning`;

    return this.http.get<any>(morningWagerUrl, httpOptions)
    .pipe(
        retry(2),
        catchError(this.handleError)            
    );
  }

  public getAfternoonOdds() {
    const noonWagerUrl = `${this.domain}/api/Clients/wagers/noon`;

    return this.http.get<any>(noonWagerUrl, httpOptions)
    .pipe(
        retry(2),
        catchError(this.handleError)            
    );
  }

  public getEveningOdds() {
    const nigthWagerUrl = `${this.domain}/api/Clients/wagers/night`;

    return this.http.get<any>(nigthWagerUrl, httpOptions)
    .pipe(
        retry(2),
        catchError(this.handleError)            
    );
  }

  // Submit Cashout Investment from deposit balance
  public saveClientWager(wagerObj: InvestmntInterface): Observable<any> {
    
    const wagerInvestmntUrl = `${this.domain}/api/Clients/investment/wager`;

    return this.http.post<InvestmntInterface>(wagerInvestmntUrl, wagerObj, httpOptions)
    .pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }

  // get all wagers
  public getWagers(): Observable<any> {
    const wagerUrl = `${this.domain}/api/Clients/wagers`;

    return this.http.get<InvestmntInterface>(wagerUrl, httpOptions)
    .pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }

}
