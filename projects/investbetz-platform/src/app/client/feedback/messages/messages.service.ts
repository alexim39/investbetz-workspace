import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { MessageInterface } from './messages.interface';

const httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
};

@Injectable()
export class MessageService {

    private domain = `http://localhost:8383`;
    //private domain = `www.investbetz.com`;

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

    // get client sent messages
    public getClientSentMsgs(clientId: string): Observable<MessageInterface> {

        const sentMsglUrl = `${this.domain}/api/Clients/msg/sent/${clientId}`;

        return this.http.get<MessageInterface>(sentMsglUrl, httpOptions)
        .pipe(
            retry(2), // retry a failed request up to 2 times
            catchError(this.handleError)
        );
    }

    // get client recived messages
    public getClientReceivedMsgs(clientId: string): Observable<MessageInterface> {

        const receivedMsglUrl = `${this.domain}/api/Clients/msg/received/${clientId}`;

        return this.http.get<MessageInterface>(receivedMsglUrl, httpOptions)
        .pipe(
            retry(2), // retry a failed request up to 2 times
            catchError(this.handleError)
        );
    }

    // get a message
    public getOneMessage(msgId: string) {
        const oneMsglUrl = `${this.domain}/api/Clients/msg/${msgId}`;

        return this.http.get<MessageInterface>(oneMsglUrl, httpOptions)
        .pipe(
            retry(2), // retry a failed request up to 2 times
            catchError(this.handleError)
        );
    }
}