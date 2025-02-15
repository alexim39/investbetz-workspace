import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordService, ForgotPasswordInterface } from '../forgot-password.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgIf } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { FooterBottomComponent } from '../../footer/footer-bottom/footer-bottom.component';

// Declare jquery as any
declare var $: any;

@Component({
    selector: 'app-new-password',
    templateUrl: './new-password.component.html',
    styleUrls: ['./new-password.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ]),
    ],
    imports: [RouterLink, FormsModule, ReactiveFormsModule, NgIf, FooterComponent, FooterBottomComponent]
})
export class NewPasswordComponent implements OnInit {

  newPasswordForm: FormGroup;
  password: string;

  // loading indicator
  loading: boolean;
  disabled: boolean;
  // status msg
  errMsg: string;
  sucMsg: string;
  // User details
  private id: string;
  private email: string;

  constructor( private fb: FormBuilder, private fgpService: ForgotPasswordService, private route: ActivatedRoute) {
    // off loading indicator
    this.loading = false;
    this.disabled = false;

     // formGroup
     this.newPasswordForm = this.fb.group({
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$') // Must have a character and digit
      ])],
    });
  }

  public newPasswordSubmit(post) {
    // on loading indicator
    this.loading = true;
    this.disabled = false;

    // Process sign in
    this.password = post.password;

    // Access returned parameters
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.email = params.email;
    });

     // PostObj Model
     const passwordCredentials: ForgotPasswordInterface = {
      email: this.email,
      _id: this.id,
      password: this.password,
    };

    this.fgpService.changePasword(passwordCredentials).subscribe(
      (res) => {
        console.log(res);
        if (res.pass === false) {
          this.errMsg = res.msg;
          this.loading = false;
          // Remove msg after few sec
          setTimeout(() => { this.errMsg = null; }, 6000);
          return;
        } else {
          this.sucMsg = 'Your password has been changed successfully';
          this.loading = false;
          this.disabled = true;
          // Remove msg after few sec
          // setTimeout(() => { this.sucMsg = null; }, 6000);
          return;
        }
    }, (err: HttpErrorResponse) => {

       if (err.error.pass === false) {
         this.errMsg = err.error.msg;
         this.loading = false;
         // Remove msg after few sec
         setTimeout(() => { this.errMsg = null; }, 6000);
         return;
       }
    });
  }

  ngOnInit() {
  }

}
