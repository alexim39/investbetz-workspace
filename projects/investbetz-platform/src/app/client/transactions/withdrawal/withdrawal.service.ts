import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { WithdrawInterface } from './withdrawal.interface';
import { AutoWithdrawInterface } from './auto-withdraw/auto-withdraw.interface';

const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({
  'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class WithdrawService {

  private domain = `http://localhost:8383`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occured. Handle accordingly
        // console.error('An error occured:', error.error.message);
        return throwError(`Request failed due to network error, please try again`);
    } else {
        // Backend returned an unsuccessful response code.
        // The repsonse body contains clues as to what went wrong
        // console.error(`Backend error code: ${error.status}, backend message: ${error.error}`);
        return throwError(error);
    }
    // Return an observable with user-facing error msg
    // return throwError(`Something went wrong, please try again.`)
  }

  // get current withdrawable balance
  public getClientWithdrawableBalance(clientId: string): Observable<any>{
    const currentWithdrawableBalanceUrl = `${this.domain}/api/Clients/balance/withdrawable/${clientId}`;

    return this.http.get<any>(currentWithdrawableBalanceUrl, httpOptions)
    .pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }


  // send request for withdrawal
  public submitWithdrawalRequest(withdrawDetailsObj: WithdrawInterface): Observable<any> {
    const withdrawUrl = `${this.domain}/api/Clients/withdrawal/request/save`;

    return this.http.post<any>(withdrawUrl, withdrawDetailsObj, httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // set automatic withdraw
  public setAutomaticWithdraw(autoWithdrawObj: AutoWithdrawInterface): Observable<AutoWithdrawInterface> {

    const autoWithdrawUrl = `${this.domain}/api/Clients/withdrawal/request/auto`;

    return this.http.post<AutoWithdrawInterface>(autoWithdrawUrl, autoWithdrawObj, httpOptions)
    .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError)
    );
  }

}
