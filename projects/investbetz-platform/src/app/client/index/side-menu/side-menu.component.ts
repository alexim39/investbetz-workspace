import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';
import { BalanceComponent } from './balance/balance.component';
import { CommonModule, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';

// Declare jQuery as any
declare const $: any;

@Component({
  selector: 'async-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  imports: [BalanceComponent, CommonModule, RouterLinkActive, RouterLink, LowerCasePipe, TitleCasePipe],
})
export class SideMenuComponent implements OnInit, AfterViewInit {

  img: string = 'img/users/template.png';
  public user: any;

  // Sample data for the Invest menu with nested children
  investMenuData = [
    {
      label: 'New Plan',
      // This item has a nested subsubmenu
      children: [
        { label: 'CashOut', routerLink: ['../dashboard/investments/cashout'] },
        { label: 'CashUp', routerLink: ['../dashboard/investments/cashup'] }

      ]
    },
    {
      label: 'Active Plans',
      routerLink: ['../dashboard/investments/active']
    },
   /*  {
      label: 'Plans History',
      routerLink: ['../dashboard/investments/hisotry']
    } */
  ];

  constructor(
    private auth: AuthService, 
    private router: Router
  ) { }

  ngOnInit() {
    // Load current client details
    this.auth.profile().subscribe((user: any) => {
      this.user = user;
    }, (error: Error) => {
      console.error(error);
      this.router.navigate(['/home']);
    });

    $(document).ready(() => {
      // Initialize sidenav
      $('.sidenav').sidenav({
        draggable: true,
        edge: 'left',
      });

      // Initialize dropdown (if any)
      $('.dropdown-trigger').dropdown({ coverTrigger: false });

      // Toggle top-level invest menu indicators
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

      // Toggle settings menu indicators
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

      // Toggle feedback menu indicators
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

      // Toggle wager menu indicators
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

      // Toggle financial menu indicators
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

  // After the view  is rendered, initialize collapsible elements and nested header toggling
  ngAfterViewInit() {
    $('.collapsible').collapsible();

    // For each nested header, toggle its icons when clicked.
    $('.nested-header').each(function(this: HTMLElement) {
      const $header = $(this);
      // Ensure the closed icon is visible initially and opened is hidden.
      $header.find('.nested-collapsible-closed').show();
      $header.find('.nested-collapsible-opened').hide();

      $header.on('click', function(this: HTMLElement) {
        const closedIcon = $header.find('.nested-collapsible-closed');
        const openedIcon = $header.find('.nested-collapsible-opened');
        if (closedIcon.is(':visible')) {
          closedIcon.hide(600);
          openedIcon.show(600);
        } else {
          closedIcon.show(600);
          openedIcon.hide(600);
        }
      });
    });
  }
}
