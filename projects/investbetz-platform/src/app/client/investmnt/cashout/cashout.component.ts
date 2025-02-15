import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { CashoutService } from './cashout.service';
import { InvestmntInterface } from './../investmnt.interface';

import { InvestmntClass } from '../investmnt.class';
import { EventEmitterService } from './../../../shared/services-module/event-emitter';

import {MatSnackBar} from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

// declare jquery as any
declare const $: any;

@Component({
    selector: 'app-cashout',
    templateUrl: './cashout.component.html',
    styleUrls: ['./cashout.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ]),
    ],
    imports: [RouterLink]
})
export class CashoutComponent extends InvestmntClass implements OnInit {
  private clientId!: string;

  // Submit Btn
  public cashoutBtn: boolean;

  public isInvestFromDepositBalance!: boolean;

  constructor(private auth: AuthService, private cashoutService: CashoutService, private snackBar: MatSnackBar, private eventEmitterService: EventEmitterService) {
    super();
    // disable btn by default
    this.cashoutBtn = true;
  }

  // toggle switch box
  public chooseInvestmntOptions(option: boolean): void {
    this.isInvestFromDepositBalance = option;
  }

  //public getCashout(value: number): void {
  public getCashout(value: any): void {
    if ( value >= 5000 && value <= 100000 ) { // Only activate btn when value is >= 5000
      this.cashoutBtn = false;
    } else { //  if ( value < 5000 ) {
      this.cashoutBtn = true;
    }
  }

  //public submitCashOut(cashoutAmount: number) {
  public submitCashOut(cashoutAmount: any) {

    if (!this.isInvestFromDepositBalance) { // Investment from deposit balance

      const cashoutObj: InvestmntInterface = {
        clientId: this.clientId,
        amount: cashoutAmount,
        investedFrom: 'deposit',
        period: 6, // 6 days used instead of 7 since sunday is not involed
        plan: 'Cashout',
        transactionId: super.generateTransactionId(),
        transactionStatus: 'completed', // Note: this values should come from the payment gateway - pending, failed or complete
      };

      this.cashoutService.saveCashOutInvestmntFromDeposit(cashoutObj).subscribe((response) => {
        if (response.message === 'done') {
          //this.successMessage = 'Your CashOut investment transaction was successful';
          this.snackBar.open('Your CashOut investment transaction was successful', 'Close', { 
            duration: 6000,
            panelClass: ['snackbar', 'success']
           });

          // refresh balance to update new value
          this.eventEmitterService.refreshButtonClick();
          
          return;
        }
      }, (error) => {
        console.log(error)
        //this.errorMessage = error.error.message;
        this.snackBar.open(error.error.message, 'Close', { 
          duration: 6000,
          panelClass: ['snackbar', 'error']
         });
      });

    } else { // Investment from user withdrawable balance

       const cashoutObj: InvestmntInterface = {
        clientId: this.clientId,
        amount: cashoutAmount,
        investedFrom: 'withdrawable',
        period: 6, // 6 days used instead of 7 since sunday is not involed
        plan: 'Cashout',
        transactionId: super.generateTransactionId(),
        transactionStatus: 'completed', // Note: this values should come from the payment gateway - pending, failed or complete
      };

       this.cashoutService.saveCashOutInvestmntFromWithdrawable(cashoutObj).subscribe((response) => {
        if (response.message === 'done') {
          //this.successMessage = 'Your CashOut investment transaction was successful';
          this.snackBar.open('Your CashOut investment transaction was successful', 'Close', { 
            duration: 6000,
            panelClass: ['snackbar', 'success']
           });

          // refresh balance to update new value
          this.eventEmitterService.refreshButtonClick();
          
          return;
        }
      }, (error) => {
        this.snackBar.open(error.error.message, 'Close', { 
          duration: 6000,
          panelClass: ['snackbar', 'error']
         });
      });
    }
  }

  ngOnInit() {
    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      this.clientId = user._id;
    }, (error: Error) => {
      console.error(error);
    })

  }

}
