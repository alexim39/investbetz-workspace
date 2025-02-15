

import { LandingComponent } from './landing/landing.component';
//import { AuthVerifyComponent } from '../auth/auth-verify/auth-verify.component';
//import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
//import { NewPasswordComponent } from './forgot-password/new-password/new-password.component';
import { Routes } from "@angular/router";

export const IndexRouting: Routes = [
  { path: '', 
    component: LandingComponent 
  },
 /*  { path: 'verify', 
    component: AuthVerifyComponent 
  }, */
 /*  { path: 'forgot-password', 
    component: ForgotPasswordComponent 
  }, */
 /*  { path: 'change-password', 
    component: NewPasswordComponent 
  } */
];


