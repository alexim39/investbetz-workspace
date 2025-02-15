import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  })
};

export interface ChangePasswordInterface {
  currentPassword: string;
  newPassword: string;
  email: string;
  clientId: string;
}


@Injectable()
export class SecuritySettingService {

  private domain = `http://localhost:8383`;
    //private domain = `www.investbetz.com`;

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

  public changePassword (passwordObj: ChangePasswordInterface) {
    const changePasswordUrl = `${this.domain}/api/Clients/password/change`;

    return this.http.post<any>(changePasswordUrl, passwordObj, httpOptions)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError)
    );
  }
}
