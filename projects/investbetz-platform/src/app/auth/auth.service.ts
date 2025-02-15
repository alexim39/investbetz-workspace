import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export interface SignInInterface {
  email: string;
  psswd: string;
}

export interface SignUpInterface {
  firstName: string;
  lastName: string;
  email: string;
  psswd: string;
  checkTerms: boolean;
}

const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = 'http://localhost:8383';

  constructor(private http: HttpClient) {}

  /**
   * Handles HTTP errors by differentiating between client-side and server-side issues.
   * Uses the modern factory function for throwError.
   * @param error The HTTP error response.
   * @returns An observable error.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error.
      return throwError(() => new Error('Request failed due to network error, please try again'));
    } else {
      // Backend returned an unsuccessful response code.
      return throwError(() => error);
    }
  }

  /**
   * Attempts to sign in a user.
   * @param userObj The sign-in credentials.
   * @returns An observable of the sign-in response.
   */
  public signIn(userObj: SignInInterface): Observable<SignInInterface> {
    const signInUrl = `${this.url}/api/Clients/signin`;
    return this.http.post<SignInInterface>(signInUrl, userObj, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves the profile information of the signed-in user.
   * @returns An observable of the user's profile.
   */
  public profile(): Observable<SignInInterface> {
    const profileUrl = `${this.url}/api/Clients/client`;
    return this.http.get<SignInInterface>(profileUrl, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Signs out the current user.
   * @returns An observable representing the sign-out operation.
   */
  public signOut(): Observable<any> {
    const signOutUrl = `${this.url}/api/Clients/signout`;
    return this.http.get<any>(signOutUrl, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Registers a new user.
   * @param userObj The sign-up details.
   * @returns An observable of the sign-up response.
   */
  public signUp(userObj: SignUpInterface): Observable<SignUpInterface> {
    const signUpUrl = `${this.url}/api/Clients/signup`;
    return this.http.post<SignUpInterface>(signUpUrl, userObj, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
