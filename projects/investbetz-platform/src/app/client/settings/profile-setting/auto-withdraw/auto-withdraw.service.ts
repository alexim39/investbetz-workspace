import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { AutoWithdrawInterface } from './auto-wthdraw.interface';
//import { BankDetailsInterface } from './bank-details.interface';

const httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root',
})
export class AutoWithdrawService {

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
            // console.error(`Backend error code: ${error.status}, backend message: ${error.error}`);
            return throwError(error);
        }
        // Return an observable with user-facing error msg
        // return throwError(`Something went wrong, please try again.`)
    }

    public getAutoWithdrawSettings(clientId: string): Observable<AutoWithdrawInterface> {
        const autoWithdrawUrl = `${this.domain}/api/Clients/auto-withdrawal/request/${clientId}`;

        return this.http.get<AutoWithdrawInterface>(autoWithdrawUrl, httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError)
        );
    }

    // cancel client withdraw request
  public cancelAutoWithdrawRequest(withdrawId: string): Observable<any> {
    const cancelAutoWithdrawRequestUrl = `${this.domain}/api/Clients/auto-withdrawal/cancel/${withdrawId}`;

    return this.http.get<AutoWithdrawInterface>(cancelAutoWithdrawRequestUrl, httpOptions)
    .pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }

}