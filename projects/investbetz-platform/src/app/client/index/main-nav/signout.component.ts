import {Component, OnDestroy} from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

/**
 * @title Authentication signout action
 */
@Component({
  selector: 'async-signout',
  template: `
  <a (click)="signOut()"><i class="material-icons left">power_settings_new</i>Sign out</a>
  `,
  imports: [RouterModule]
})
export class AuthSignout implements OnDestroy {

    subscriptions: Subscription[] = [];

    constructor(
    private auth: AuthService, 
    private router: Router
    ) { }


    /**
     * Signs the user out, clearing local storage, session storage, and navigating to the home route.
     * Handles potential errors during the sign-out process.
     */
    signOut(): void {
    this.clearStorage();

    const signOutSubscription = this.auth.signOut().subscribe({ // Store the subscription
    next: (response: any) => {
        if (response && response.message === 'logout') {
        this.clearAuthToken();
        this.navigateToHome();
        } else {
        console.warn('Unexpected response from sign-out:', response);
        this.navigateToHome();
        }
    },
    error: (error) => {
        console.error('Error during sign-out:', error);
        this.navigateToHome();
    },
    complete: () => {
        console.log("Sign out process complete.");
    }
    });

    this.subscriptions.push(signOutSubscription); // Add subscription to the array
}

/**
 * Clears local storage and session storage.
 */
private clearStorage(): void {
    localStorage.clear();
    sessionStorage.clear();
}

/**
 * Removes the authentication token from local storage.
 */
private clearAuthToken(): void {
    localStorage.removeItem('authToken');
}

/**
 * Navigates the user to the home route, replacing the current URL in the history.
 */
private navigateToHome(): void {
    this.router.navigate(['/'], { replaceUrl: true });
}


ngOnDestroy() { // Implement ngOnDestroy
    this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
    });
    this.subscriptions = []; // Clear the array after unsubscribing (optional but good practice)
}
}
