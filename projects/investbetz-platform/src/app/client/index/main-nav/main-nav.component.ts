import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';
import { AuthService } from '../../../auth/auth.service';

// Declare jquery as any
declare const $: any;

@Component({
selector: 'async-main-nav',
templateUrl: './main-nav.component.html',
styles: `
.brand-logo {
  font-family: 'Playball-Regular';
  font-size: 2.2em;
  color: #212121;
  padding-left: 1em;
  cursor: pointer;
}
.left {
  margin-right: 3px !important;
}
`,
imports: [RouterLink, NotificationsComponent, RouterLinkActive],
})

export class MainNavComponent implements OnInit {

  public isAdmin!: boolean;

  constructor(
    private auth: AuthService, 
    private router: Router
  ) { }

  ngOnInit() {
    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      //this.cardDepositEmail = user.email;
      //this.clientId = user._id;
      if (user.userType === 'admin') {
        this.isAdmin = true;
      }
    }, (error: Error) => {
      // disable btn
      console.error(error)
    })

    $(document).ready(() => {
      // Init dropdown
      $('.dropdown-trigger').dropdown({
        coverTrigger: false
      });
    });
  }

  public signOut() {
    // Call AuthService logout Method
    this.auth.signOut().subscribe((response: any,) => {
      if (response.message === 'logout') {
        this.router.navigate(['/']);
      }
    }, (error) => {
      console.error(error)
    });
  }

}
