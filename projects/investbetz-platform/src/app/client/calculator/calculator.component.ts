import { Component, OnInit } from '@angular/core';
import { CashoutCalculatorComponent } from './cashout-calculator/cashout-calculator.component';
import { CashupCalculatorComponent } from './cashup-calculator/cashup-calculator.component';

// declare jquery as any
declare const $: any;

@Component({
selector: 'app-calculator',
template: `
<div class="container">
  <div class="row">
    <div class="col s12">

      <ul id="tabs-swipe-demo" class="tabs">
        <li class="tab col s12 m6"><a class="active" href="#CashOut">CashOut Calculator</a></li>
        <li class="tab col s12 m6"><a href="#CashUp">CashUp Calculator</a></li>
      </ul>

      <div id="CashOut" class="tab-content col s12">
        <app-cashout-calculator></app-cashout-calculator>
      </div>

      <div id="CashUp" class="tab-content col s12">
        <app-cashup-calculator></app-cashup-calculator>
      </div>

    </div>
  </div>
</div>
`,
styles: `
.container {
  margin-top: 5em;
  margin-bottom: 2em;
}
`,
imports: [CashoutCalculatorComponent, CashupCalculatorComponent]
})
export class CalculatorComponent implements OnInit {
  
  constructor() {}

  ngOnInit() {
    $(document).ready(() => {
      // Init tab
      $('.tabs').tabs({
        duration: 3000,
      });

      // Init select element
      $('select').formSelect();

    });
  }

}
