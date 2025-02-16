import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SecuritySettingClass } from './security-setting.class';
// declare jquery as any
declare const $: any;
import { SecuritySettingService, ChangePasswordInterface } from './security-setting.service';

import { NgIf } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-security-setting',
    templateUrl: './security-setting.component.html',
    styleUrls: ['./security-setting.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ]),
    ],
    imports: [FormsModule, ReactiveFormsModule, NgIf],
    providers: [SecuritySettingService]
})
export class SecuritySettingComponent extends SecuritySettingClass implements OnInit {

   // user email
   //protected email: string = '';
   protected clientId!: string;

  changePasswordForm: FormGroup;
  currentPassword!: string;
  newPassword!: string;

  // loading indicator
  //loading: boolean;
  // status msg
  //errMsg: string;
  //sucMsg: string;

  constructor(private fb: FormBuilder, private secService: SecuritySettingService, private auth: AuthService, private snackBar: MatSnackBar) {

    // Call parent class constructor
    super();

    // off loading indicator
    //this.loading = false;

    // signInForm formGroup
    this.changePasswordForm = this.fb.group({
      'currentPassword': [null, Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$') // Must have a character and digit
      ])],
      'newPassword': [null, Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$') // Must have a character and digit
      ])],
    });

  }

  public changePassword(post: any) {
    // on loading indicator
    //this.loading = true;

     // Process
     this.currentPassword = post.currentPassword;
     this.newPassword = post.newPassword;

     // PasswordObj Model
    const passwordObj: ChangePasswordInterface = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      email: this.email,
      clientId: this.clientId
    };

    // Check passwords are not same
    if (super.passwordCheck(this.currentPassword, this.newPassword)) {
      /* this.errMsg = 'Your current password must be different from your new password';
      this.loading = false;
      // Remove msg after few sec
      setTimeout(() => { this.errMsg = null; }, 6000);
      return; */
      this.snackBar.open(`Your new password must be different from your current password`, 'Close', {
        duration: 6000,
        panelClass: ['snackbar', 'error']
       });
       return;
    }

    // Call change password Method
    this.secService.changePassword(passwordObj).subscribe((response) => {
      if (response.message === 'done') {

        this.snackBar.open(`Your password have been changed successfully`, 'Close', {
          duration: 6000,
          panelClass: ['snackbar', 'success']
         });
      }
    }, (error) => {
      this.snackBar.open(error.error.message, 'Close', {
        duration: 6000,
        panelClass: ['snackbar', 'error']
       });
    });

  }

  ngOnInit() {

    // Init tooltipped
    $('.tooltipped').tooltip();
    // Init modal
    $('.modal').modal();

    // Get the user details from auth service
    this.auth.profile().subscribe((user: any) => {
      this.email = user.email;
      this.clientId = user._id;
    }, (error: Error) => {
      console.error(error);
    });

  }

}
