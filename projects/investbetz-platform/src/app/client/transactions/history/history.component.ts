import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { WithdrawalHistoryComponent } from './withdrawal/withdrawal-history.component';
import { DepositHistoryComponent } from './deposit/deposit-history.component';

// declare jquery as any
declare const $: any;

@Component({
selector: 'async-history',
animations: [
  trigger('fadeInOut', [
      state('void', style({
          opacity: 0
      })),
      transition('void <=> *', animate(1000)),
  ]),
],
template: `
<div class="history-container">
  <div class="row">
    <div class="col s12">

        <ul class="collapsible popout z-depth-5 grey-text text-darken-1">

        <li class="active panel">
            <div class="collapsible-header"><i class="material-icons">credit_card</i>Deposit Histories</div>
            <div class="collapsible-body">
              <async-deposit-history></async-deposit-history>
            </div>
          </li>

          <li class="panel">
            <div class="collapsible-header"><i class="material-icons">monetization_on</i>Withdrawal Histories</div>
            <div class="collapsible-body">
              <async-withdrawal-history></async-withdrawal-history>
            </div>
          </li>


        </ul>

    </div>
  </div>
</div>
`,
styles: [`
  .history-container {
    margin: 3em 2em;
    .panel {
    border-radius: 10px;
    }
  }
`],
imports: [WithdrawalHistoryComponent, DepositHistoryComponent]
})
export class HistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Init Collapsible
    $(document).ready(() => {
      $('.collapsible').collapsible();
    });
  }
}
