import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { UserDetailsInterface } from './user-details.interface';

const httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
};

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {

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

    public clientProfileUpdate(profileUpdateObj: UserDetailsInterface): Observable<any> {
        const profileUpdateUrl = `${this.domain}/api/Clients/profile/update`;

        return this.http.post<any>(profileUpdateUrl, profileUpdateObj, httpOptions)
        .pipe(
            retry(2),
            catchError(this.handleError)
        );
    }

}