import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordService, ForgotPasswordInterface } from './forgot-password.service';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { FooterBottomComponent } from '../footer/footer-bottom/footer-bottom.component';

// Declare jquery as any
declare const $: any;

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
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
export class ForgotPasswordComponent implements OnInit {

  fpForm: FormGroup;
  email!: string;

  // loading indicator
  loading: boolean;
  disabled: boolean;
  // status msg
  errMsg!: string;
  sucMsg!: string;

  constructor( private fb: FormBuilder, private fgpService: ForgotPasswordService) {
    // off loading indicator
    this.loading = false;
    this.disabled = false;

    this.fpForm = this.fb.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email
      ])]
    });
  }

  public fpSubmit(post: any) {
    // on loading indicator
    this.loading = true;

    // Process sign in
    this.email = post.email;

    const emailObj: any = {
      email: this.email,
    };

    this.fgpService.forgotPassword(emailObj).subscribe(
      (res) => {
      // Check if email exist
      if (res === null) {
        this.errMsg = 'Your provided email is not associated to any active account';
        this.loading = false;
        // Remove msg after few sec
        setTimeout(() => { this.errMsg = ''; }, 6000);
        return;
      }
      if (res.email === this.email) {
        // Send user a link on email to change password
        this.sucMsg = 'A link has been sent to your email, please go click on that link to change your password';
        this.loading = false;
        this.disabled = true;
        // Remove msg after few sec
        // setTimeout(() => { this.sucMsg = null; }, 6000);
        return;
        // redirect
        // this.router.navigateByUrl('home/change-password?id=' + res._id + '&email=' + res.email);
      }
    }, (err: HttpErrorResponse) => {
      // console.error(err.error);

      if (err.error.pass === false) {
        this.errMsg = err.error.msg;
        this.loading = false;
        // Remove msg after few sec
        setTimeout(() => { this.errMsg = ''; }, 6000);
        return;
      }
    });
  }

  ngOnInit() {
    $(document).ready( () => {
      
    });
  }

}
