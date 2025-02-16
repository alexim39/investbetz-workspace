import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './index/side-menu/side-menu.component';
import { MainNavComponent } from './index/main-nav/main-nav.component';

@Component({
    selector: 'app-user-dashboard',
    template: `
    <async-side-menu></async-side-menu>

    <main class="row">
      <async-main-nav></async-main-nav>
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
