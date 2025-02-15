import { Component } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

@Component({
    selector: 'app-auth',
    template: `
    <ul class="collapsible popout">
  <!-- Sign up -->
  <li>
    <div class="collapsible-header">
      <i class="material-icons">person_add</i>Sign Up Form
    </div>

    <div class="collapsible-body">
      <async-sign-up></async-sign-up>
    </div>
  </li>

  <!-- Sign in -->
  <li class="active">
      <div class="collapsible-header">
        <i class="material-icons">person_outline</i>Sign In Form
      </div>

      <div class="collapsible-body">
        <async-sign-in></async-sign-in>
      </div>
    </li>
  </ul>
    `,
  styles: `
    .password-error-msg {
      color: #c62828;
      margin-top: -0.1em;
    }

    .p-hint {
      margin-top: -0.5em;
    }
  `,
    imports: [SignUpComponent, SignInComponent]
})

export class AuthComponent {}
