import { Component,} from '@angular/core';
import { BoxMenuComponent } from './box-menu/box-menu.component';

@Component({
selector: 'async-client-index',
template: `

<div class="col s12 user-dashboard ">
  
  <div class="row">
    <div class="col s12 box-menu">
      <div class="row">
        <app-box-menu></app-box-menu>
      </div>
    </div>
  </div>

  <div class="row">

    <div class="col m4 s12">
        <!-- <div class="collection">
          <a href="#!" class="collection-item">
            <span class="badge">1</span>Alan
          </a>
          <a href="#!" class="collection-item">
            <span class="new badge" data-badge-caption="replies">4</span>Alan
          </a>
          <a href="#!" class="collection-item">
            Alan
          </a>
          <a href="#!" class="collection-item">
            <span class="new badge red">14</span>Alan
          </a>
        </div> -->
    </div>

    <div class="col m8 s12">
      <div class="row">

        <div class="col s12">
              <!-- <app-profit-graph></app-profit-graph> -->
        </div>

        <div class="col s12">
            <!-- <app-monthly-profit-graph></app-monthly-profit-graph> -->
        </div>

      </div>
    </div>

  </div>
</div>
`,
styles: `
.user-dashboard {
    margin-top: 4em;
    padding-left: 4em;
    padding-right: 4em;
}
.box-menu {
    height: auto;
}
`,
imports: [BoxMenuComponent]
})
export class IndexComponent {}
