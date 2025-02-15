import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileSettingService {

  constructor() { }

  /* // Update User Profile
  public updateProfile(user): Observable<ProfileSettingInterface> {

    const headers = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put<ProfileSettingInterface>(this.restApiUrl + 'user/' + user._id, user, headers).pipe(
      map( (newUser: ProfileSettingInterface) => {
        // console.log(newUser);
        return newUser;
      })
    );
  }

   // Update User bank details
   public updateBankDetails(bankDetails): Observable<BankSettingInterface> {

    const headers = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.put<BankSettingInterface>(this.restApiUrl + 'bank/' + bankDetails._id, bankDetails, headers).pipe(
      map( (newUser: BankSettingInterface) => {
        // console.log(newUser);
        return newUser;
      })
    );
  }

  // Get a user by Id
  public getUserProfile(user): Observable<ProfileSettingInterface> {

    return this.http.get(this.restApiUrl + 'user/' + user._id).pipe(
      map((user: ProfileSettingInterface) => {
        console.log(user);
        return user;
      })
    );
  }*/

  public uploadProfileImg(formData: FormData){

    console.log(formData);
     
     /* return this.http.post<any>('http://localhost:3000/upload/img', formData ).pipe(
      map( (img: any) => {
        return img;
      })
    ); */

  } 

}
