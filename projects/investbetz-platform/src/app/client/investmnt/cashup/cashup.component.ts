import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { CashupService } from './cashup.service';
import { InvestmntInterface } from './../investmnt.interface';

import { InvestmntClass } from '../investmnt.class';

import { EventEmitterService } from './../../../shared/services-module/event-emitter';

import {MatSnackBar} from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

// declare jquery as any
declare var $: any;

@Component({
    selector: 'app-cashup',
    templateUrl: './cashup.component.html',
    styleUrls: ['./cashup.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ]),
    ],
    imports: [RouterLink, FormsModule]
})
export class CashupComponent extends InvestmntClass implements OnInit {
  private clientId!: string;

  // Init Btn
  public cashupBtn: boolean;

  // Cashup properties
  public cashupField!: number;
  public cashupSelect!: number;

  public isInvestFromDepositBalance!: boolean;

  constructor(private auth: AuthService, private cashupService: CashupService, private snackBar: MatSnackBar, private eventEmitterService: EventEmitterService) {
    super();
    // disable btn by default
    this.cashupBtn = true;
  }

  // toggle switch box
  public chooseInvestmntOptions(option: boolean): void {
   this.isInvestFromDepositBalance = option;
  }

  // Validate User input details
  //public getCashup(value: number) {
  public getCashup(value: any) {
    // Check if both input field are empty
    if (this.cashupField === undefined || this.cashupSelect === undefined) {
      this.cashupBtn = true;
      return;
    }

    if ( value >= 3000 && value <= 100000 ) { // Only activate btn when value is >= 3000
      this.cashupBtn = false;
    } else { // if ( value < 3000 ) {
      this.cashupBtn = true;
    }
  }

  
  // Submit Cashup Investment Details
  //public submitCashUp(cashupAmount: number, duration: number) {
  public submitCashUp(cashupAmount: any, duration: any) {

    if (!this.isInvestFromDepositBalance) { // Check investmnt deposit options

      const cashupObj: InvestmntInterface = {
        clientId: this.clientId,
        amount: cashupAmount,
        investedFrom: 'deposit',
        period: duration,
        plan: 'Cashup',
        transactionId: super.generateTransactionId(),
        transactionStatus: 'completed' // Note: this values should come from the payment gateway - pending, failed or complete
      };

      this.cashupService.saveCashOutInvestmntFromDeposit(cashupObj).subscribe((response) => {
        if (response.message === 'done') {
         // this.successMessage = 'Your CashUp investment transaction was successful';
         this.snackBar.open('Your CashUp investment transaction was successful', 'Close', { 
            duration: 6000,
            panelClass: ['snackbar', 'success']
          });

          // refresh balance to update new value
          this.eventEmitterService.refreshButtonClick();
          
          return;
        }
      }, (error) => {
        //this.errorMessage = error.error.message;
        this.snackBar.open(error.error.message, 'Close', { 
          duration: 6000,
          panelClass: ['snackbar', 'error']
         });
      });

    } else { // Investment from user withdrawable balance

      const cashupObj: InvestmntInterface = {
        clientId: this.clientId,
        amount: cashupAmount,
        investedFrom: 'withdrawable',
        period: duration,
        plan: 'Cashup',
        transactionId: super.generateTransactionId(),
        transactionStatus: 'completed' // Note: this values should come from the payment gateway - pending, failed or complete
      };

      this.cashupService.saveCashOutInvestmntFromWithdrawable(cashupObj).subscribe((response) => {
        if (response.message === 'done') {
          //this.successMessage = 'Your CashUp investment transaction was successful';
          this.snackBar.open('Your CashUp investment transaction was successful', 'Close', { 
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

    $(document).ready(() => {
      // Init select element
      $('select').formSelect();
    });

  }


}
