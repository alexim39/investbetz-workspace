import { Component, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService, SignInInterface } from '../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AppPasswordToggleDirective } from '../password-toggle.directive';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'async-sign-in',
  templateUrl: './sign-in.component.html',
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(1000)),
    ]),
  ],
  providers: [AuthService],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    MatFormFieldModule,
    MatIconModule,
    AppPasswordToggleDirective,
    MatProgressBarModule
  ],
})
export class SignInComponent implements OnDestroy {
  /**
   * Reactive form for user sign-in.
   */
  public signInForm!: FormGroup;

  /**
   * Indicates whether a sign-in request is currently in progress.
   */
  public isLoading = false;

  /**
   * Error message to display when sign-in fails.
   */
  public errorMessage = '';

  /**
   * Success message to display when sign-in is successful.
   */
  public successMessage = '';


  /**
   * Subscription reference for sign-in observable.
   */
  private signInSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.initializeForm();
  }

  /**
   * Initializes the reactive sign-in form with validators.
   */
  private initializeForm(): void {
    this.signInForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      psswd: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          // Pattern ensures at least one letter and one digit.
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};\':",\\\\|,.<>\/?]*)$') // Allow special characters
        ],
      ],
    });
  }

  /**
   * Handles the form submission for signing in.
   * Displays feedback via the snack bar and navigates to the profile page upon success.
   * @param credentials The user-provided sign-in credentials.
   */
  public onSubmit(credentials: SignInInterface): void {
    this.isLoading = true;
    const userCredentials: SignInInterface = {
      email: credentials.email,
      psswd: credentials.psswd,
    };

    // Save the subscription for later cleanup.
    this.signInSubscription = this.authService.signIn(userCredentials).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.message === 'done') {
          localStorage.setItem('authToken', response.message); // Save token to localStorage
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        this.isLoading = false;
      },
    });
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Unsubscribes from any active subscriptions to prevent memory leaks.
   */
  public ngOnDestroy(): void {
    if (this.signInSubscription) {
      this.signInSubscription.unsubscribe();
    }
  }
}
