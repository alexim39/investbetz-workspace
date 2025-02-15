import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `

  admin works
  <router-outlet />

  `,
  styles: `
  `
})
export class AppComponent {
  title = 'investbetz-admin';
}
