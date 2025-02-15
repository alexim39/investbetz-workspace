import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgIf } from '@angular/common';
import { AuthService, SignUpInterface } from '../auth.service';
import { AppPasswordToggleDirective } from '../password-toggle.directive';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'async-sign-up',
  templateUrl: './sign-up.component.html',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(1000)),
    ]),
  ],
  // Remove providers array if AuthService is provided via providedIn: 'root'
  imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink, AppPasswordToggleDirective, MatProgressBarModule]
})
export class SignUpComponent {
  /** Reactive form for sign-up */
  public signUpForm!: FormGroup;

  /** Indicates if a sign-up request is in progress */
  public isLoading = false;

  /** Indicator to disable the submit button after a successful sign-up */
  public isSignedUp = false;

  /** Error message to display when sign-up fails */
  public errorMessage = '';

  /** Success message to display when sign-up succeeds */
  public successMessage = '';

  constructor(
    private signUpService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.initializeForm();
  }

  /**
   * Initializes the reactive sign-up form with validation rules.
   */
  private initializeForm(): void {
    this.signUpForm = this.fb.group({
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(6)]],
      psswd: [null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};\':",\\\\|,.<>\/?]*)$') // Allow special characters
      ]],
      checkTerms: [false, [Validators.requiredTrue]]
    });
  }

  /**
   * Handles the form submission for sign-up.
   * Sets loading state, submits the sign-up request, and handles the response.
   * @param post The form values as a SignUpInterface object.
   */
  public onSubmit(post: SignUpInterface): void {
    this.isLoading = true;

    const userObj: SignUpInterface = {
      firstName: post.firstName,
      lastName: post.lastName,
      email: post.email,
      psswd: post.psswd,
      checkTerms: post.checkTerms,
    };

    this.signUpService.signUp(userObj).subscribe({
      next: (response: any) => {
        if (response.message === 'done') {
          this.successMessage = `Your account has been created but needs to be activated. Please check your email to activate your account.`;
          // Remove the success message after 6 seconds
          setTimeout(() => { this.successMessage = ''; }, 15000);
          // Disable the submit button after successful sign-up
          this.isSignedUp = true;
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        // Remove the error message after 6 seconds
        setTimeout(() => { this.errorMessage = ''; }, 15000);
        this.isLoading = false;
      }
    });
  }
}
