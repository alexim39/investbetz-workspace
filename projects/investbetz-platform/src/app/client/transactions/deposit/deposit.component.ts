import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
selector: 'app-deposit',
template: `
<div class="deposit-container">

<div clas="row">

  <div class="col m4 s12 z-depth-5 deposit-list-panel">
    <div class="collection with-header">
      <div class="collection-header center-align">
        <h6>Deposit Options</h6>
      </div>
      <a [routerLink]="['card']" class="collection-item">Bank Card Deposit</a>
      <a [routerLink]="['skrill']" class="collection-item">Skrill online payment</a>
      <a [routerLink]="['bank']" class="collection-item">Bank Deposit</a>
      <!-- <a [routerLink]="['skrill']" class="collection-item">Quickteller</a> -->
    </div>
  </div>

  <div class="col m8 s12">
    <router-outlet></router-outlet>
  </div>
  
</div>
</div>

`,
styles: `
.deposit-container {
  margin: 3em;
}

.deposit-list-panel {
  padding: 1em;
}

`,
imports: [RouterLink, RouterOutlet]
})
export class DepositComponent implements OnInit {
  /*   Minimum deposit should be N3,000.00 */
  constructor() { }

  ngOnInit() {
  }

}
