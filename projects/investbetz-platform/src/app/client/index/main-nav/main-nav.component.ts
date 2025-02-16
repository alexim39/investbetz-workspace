import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationsComponent } from './notifications/notifications.component';
import { AuthSignout } from './signout.component';

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
imports: [RouterLink, NotificationsComponent, RouterLinkActive, AuthSignout],
})

export class MainNavComponent implements OnInit {


  constructor() { }

  ngOnInit() {

    $(document).ready(() => {
      // Init dropdown
      $('.dropdown-trigger').dropdown({
        coverTrigger: false
      });
    });
  }

}
