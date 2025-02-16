import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { WithdrawalHistoryInterface } from './withdrawal-history.interface';


const httpOptions = {
  //observe: body,
  withCredentials: true,
  headers: new HttpHeaders({
  'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})
export class WithdrawalHistoryService {

  private domain = `http://localhost:8383`;

  constructor(private http: HttpClient) { }

  public handleError(error: HttpErrorResponse) {
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

  // get all client withdraw request
  public getWithdrawRequest(clientId: string): Observable<any> {
    const withdrawRequestUrl = `${this.domain}/api/Clients/withdrawal/request/${clientId}`;

    return this.http.get<WithdrawalHistoryInterface>(withdrawRequestUrl, httpOptions)
    .pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }

  // cancel client withdraw request
  public cancelWithdrawRequest(withdrawId: string): Observable<any> {
    const cancelWithdrawRequestUrl = `${this.domain}/api/Clients/withdrawal/cancel/${withdrawId}`;

    return this.http.get<WithdrawalHistoryInterface>(cancelWithdrawRequestUrl, httpOptions)
    .pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }

}