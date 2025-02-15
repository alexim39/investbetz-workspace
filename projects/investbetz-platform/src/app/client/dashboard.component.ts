import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './index/side-menu/side-menu.component';
import { MainNavComponent } from './index/main-nav/main-nav.component';

@Component({
    selector: 'app-user-dashboard',
    template: `
    <app-side-menu></app-side-menu>

    <main class="row">
      <app-main-nav></app-main-nav>
      <router-outlet></router-outlet>
    </main>

    `,
    styles: `
    header, main, footer {
      padding-left: 300px;
    }
    @media only screen and (max-width : 992px) {
      header, main, footer {
        padding-left: 0;
      }
    }

    `,
    imports: [SideMenuComponent, MainNavComponent, RouterOutlet]
})
export class DashboardComponent {}
