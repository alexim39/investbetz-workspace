import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';

import { SideMenuService } from './side-menu.service';

import { BalanceComponent } from './balance/balance.component';
import { NgIf, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';

// declare jquery as any
declare const $: any;

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
    imports: [BalanceComponent, RouterLinkActive, RouterLink, NgIf, LowerCasePipe, TitleCasePipe],
    providers: [SideMenuService]
})
export class SideMenuComponent implements OnInit {

  public isAdmin!: boolean;

  // User image source
  img: string = 'img/users/template.png';

  public user: any;

  constructor(
    private auth: AuthService, 
    private sideMenuService: SideMenuService, 
    private router: Router
  ) { }

  public signOut() {
    // Call AuthService logout Method
    this.auth.signOut().subscribe((response: any,) => {
      if (response.message === 'logout') {
        this.router.navigate(['/home']);
      }
    }, (error: Error) => {
      console.error(error)
    });
  }


  ngOnInit() {

    // Load Current Client Details
    this.auth.profile().subscribe((user: any) => {
      this.user = user;
      
      if (user.userType === 'admin') {
        this.isAdmin = true;
      }
    }, (error: Error) => {
      console.error(error);
      this.router.navigate(['/home']);
    })

    $(document).ready(() => {
      // Init Sidenave
      $('.sidenav').sidenav({
        draggable: true, // Choose whether you can drag to open on touch screens
        edge: 'left', // Choose the horizontal origin

      });

      // Init Collapsible
      $('.collapsible').collapsible();

      // Init dropdown
      $('.dropdown-trigger').dropdown({
        coverTrigger: false
      });

       // Toggle setting indicator
       $('.investmnt-closed').show();
       $('.investmnt-indicator').click(() => {
        if ($('.investmnt-closed').is(':visible')) {
          $('.investmnt-closed').hide(600);
          $('.investmnt-opened').show(600);
        } else {
          $('.investmnt-closed').show(600);
          $('.investmnt-opened').hide(600);
        }
      });

      // Toggle setting indicator
      $('.setting-closed').show();
      $('.setting-indicator').click(() => {
        if ($('.setting-closed').is(':visible')) {
          $('.setting-closed').hide(600);
          $('.setting-opened').show(600);
        } else {
          $('.setting-closed').show(600);
          $('.setting-opened').hide(600);
        }
      });

      // Toggle feedback indicator
      $('.feedback-closed').show();
      $('.feedback-indicator').click(() => {
        if ($('.feedback-closed').is(':visible')) {
          $('.feedback-closed').hide(600);
          $('.feedback-opened').show(600);
        } else {
          $('.feedback-closed').show(600);
          $('.feedback-opened').hide(600);
        }
      });

      // Toggle wager indicator
      $('.wager-closed').show();
      $('.wager-indicator').click(() => {
        if ($('.wager-closed').is(':visible')) {
          $('.wager-closed').hide(600);
          $('.wager-opened').show(600);
        } else {
          $('.wager-closed').show(600);
          $('.wager-opened').hide(600);
        }
      });

      // Toggle financial indicator
      $('.financial-closed').show();
      $('.financial-indicator').click(() => {
        if ($('.financial-closed').is(':visible')) {
          $('.financial-closed').hide(600);
          $('.financial-opened').show(600);
        } else {
          $('.financial-closed').show(600);
          $('.financial-opened').hide(600);
        }
      });

    });
  }

}
