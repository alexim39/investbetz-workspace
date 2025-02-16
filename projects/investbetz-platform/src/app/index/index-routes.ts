

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contacts/contacts.component';
import { LandingComponent } from './landing/landing.component';
//import { AuthVerifyComponent } from '../auth/auth-verify/auth-verify.component';
//import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
//import { NewPasswordComponent } from './forgot-password/new-password/new-password.component';
import { Routes } from "@angular/router";

export const IndexRouting: Routes = [
  { path: '', 
    component: LandingComponent 
  },
  { path: 'about', 
    component: AboutComponent 
  },
  { path: 'contact', 
    component: ContactComponent 
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


