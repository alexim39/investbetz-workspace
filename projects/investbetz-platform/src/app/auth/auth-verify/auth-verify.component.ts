import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

// Import Auth Service
import { SignInService } from './../../auth/sign-in/sign-in.service';
import { NgIf } from '@angular/common';
import { AppPasswordToggleDirective } from '../../shared/directive-module/app-password-toggle.directive';

@Component({
    selector: 'app-auth-verify',
    templateUrl: './auth-verify.component.html',
    styleUrls: ['./auth-verify.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ]),
    ],
    imports: [NgIf, FormsModule, ReactiveFormsModule, AppPasswordToggleDirective, RouterLink]
})
export class AuthVerifyComponent implements OnInit {
    // signInFrom Values
    signInForm: FormGroup;
    signInEmail: string;
    signInpassword: string;
    signInPost: any;

    // loading indicator
    loading: boolean;
    // status msg
    errMsg: string;
    activationMsg: string;

  constructor(private authService: SignInService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    // off loading indicator
    this.loading = false;

     // signInForm formGroup
     this.signInForm = this.fb.group({
      'signInEmail': [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      'signInpassword': [null, Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$') // Must have a character and digit
      ])],
    });
  }

  public signInSubmit(post) {
    // on loading indicator
    this.loading = true;

    // Process sign in
    this.signInEmail = post.signInEmail;
    this.signInpassword = post.signInpassword;

    // PostObj Model
    const signInCredentials: any = {
      email: this.signInEmail,
      password: this.signInpassword
    };

    // Call the AuthService signIn Method
    /* his.authService.login(signInCredentials).subscribe((res) => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      // console.error(err);
      if (err.status === 401) {
        // 401 - user not found
        this.errMsg = 'Please confirm your email or password is correct';
        this.loading = false;
      } else if (err.status === 404) {
        // 404 -  passport error
        this.errMsg = 'There seems to be a problem with your sign in - try again';
        this.loading = false;
      }
      // Remove msg after few sec
      setTimeout(() => {
        this.errMsg = null;
   }, 6000);
    }) */;
  }

  private verifyAccount(token: string) {
    /* this.authService.verifyAccount(token).subscribe( (res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    }); */
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.verifyAccount(params.token);
    });
    this.activationMsg = 'Your account has been verified, you can now sign in';
  }

}
