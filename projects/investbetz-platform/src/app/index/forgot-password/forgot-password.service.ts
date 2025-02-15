import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ForgotPasswordInterface {
  _id: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private restApiUrl = 'http://localhost:3000/auth/';

  constructor(private http: HttpClient) {}

  public changePasword(passwordObj) {

    const headers = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<any>(this.restApiUrl + 'retrieve-forgot-password/', passwordObj, headers).pipe(
      map( (password: any) => {
        return password;
      })
    );
  }

  public forgotPassword(emailObj) {

    const headers = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<any>(this.restApiUrl + 'forgot-password/', emailObj, headers).pipe(
      map( (user: any) => {
        return user;
      })
    );
  }
}
