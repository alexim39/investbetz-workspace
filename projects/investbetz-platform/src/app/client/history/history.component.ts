import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { InvestmentHistoryComponent } from './investment/investment-history.component';
import { WithdrawalHistoryComponent } from './withdrawal/withdrawal-history.component';
import { DepositHistoryComponent } from './deposit/deposit-history.component';

// declare jquery as any
declare const $: any;

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ]),
    ],
    imports: [InvestmentHistoryComponent, WithdrawalHistoryComponent, DepositHistoryComponent]
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
