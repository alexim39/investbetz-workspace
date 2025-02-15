import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { WagerService } from './../wager.service';
import { InvestmntInterface } from './../../investmnt/investmnt.interface';

import { WagerClass } from './../wager.class';

import { EventEmitterService } from './../../../shared/services-module/event-emitter';

import {MatSnackBar} from '@angular/material/snack-bar';
import { NgIf, NgClass, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-wager-noon',
    templateUrl: './wager-noon.component.html',
    styleUrls: ['./wager-noon.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ]),
    ],
    imports: [NgIf, NgClass, FormsModule, CurrencyPipe]
})
export class WagerNoonComponent extends WagerClass implements OnInit {

  private clientId!: string;

  // Init odd values
  public afternoonOdd!: number;
  public afternoonDate!: string;
  public wagerId!: string;

  // status msg
  public errorMessage!: string;
  public successMessage!: string;

  // init wager amount submit btn
  public wagerSubmitBtn: boolean;

  // init expired color
  public isExpired!: boolean;

  // inti countdown
  public afternoonCountdown!: string;

  // Init payable amount on a wager amount
  public amountPayable!: number;

  // Init wager payout amount
  public wagerPayoutAmount!: number;

  // init wager amount
  public wagerAmount!: number;
  

  constructor(private auth: AuthService, private wagerService: WagerService, private eventEmitterService: EventEmitterService, private snackBar: MatSnackBar) {
    super()
    // disable submit btn by default
    this.wagerSubmitBtn = true;

  }

   // load today odds
   private loadTodayOdds() {
    // get morning odds
    this.wagerService.getAfternoonOdds().subscribe((response) => {
      if (response.message === 'done') {
        // Set odds to DOM
        this.afternoonOdd = response.wager[0].odd;
        //this.afternoonDate = response.wager[0].fullDate;
        this.wagerId = response.wager[0]._id;
      }
    }, (error) => {
      console.error(error);
    });
  }


  // Afternoon Count down timer
  private afternoonGameCountdown() {

    this.wagerService.getAfternoonOdds().subscribe((response) => {

      // Set the date we're counting down to ('Aug 13, 2019 14:00:00')
      const countDownDate: number = new Date(Number(response.wager[0].fullDate)).getTime(); // convert data string to number

      // Update the count down every 1 second
      const x = setInterval(() => {

        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        this.afternoonCountdown = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          this.afternoonCountdown = 'ALREADY EXPIRED';
          // Disable submit button when time is expired
          this.wagerSubmitBtn = true;
          // change expired odd color
          this.isExpired = true;
        }
      }, 1000);

    }, (error) => {
      console.error(error);
    });

  }


  // check wager amount value is between range
  public checkWagerAmount(wagerAmount: number) {

    if ( wagerAmount >= 500 && wagerAmount <= 50000 ) { // Only activate btn when value is >= 1000
      this.wagerSubmitBtn = false;
    } else { //  if ( value < 1000 ) {
      this.wagerSubmitBtn = true;
    }

    // calculate the initial payout amount
    this.wagerPayoutAmount = wagerAmount * this.afternoonOdd;
    // Get amount after calculating payout percentage
    this.amountPayable = super.paybleAmount(this.wagerPayoutAmount);
  }



  // submit afternoon odd btn click
  public submitAfternoonOdd() {
  
  
      // Check if withdrawable = deposit amount
      /* if (this.soddValue > this.withdrawable) {
       this.serrMsg = 'Your withdrawable balance is less than your wager amount';
       this.sloading = false;
       // Remove msg after few sec
       setTimeout(() => { this.serrMsg = null; }, 6000);
       return;
      } */

      // noon odd object
      const noonWagerObj: InvestmntInterface = {
        clientId: this.clientId,
        amount: this.wagerAmount,
        investedFrom: 'deposit',
        period: 1,
        plan: 'Wager',
        wager: this.wagerId,
        transactionId: super.generateTransactionId(),
        transactionStatus: 'completed', // Note: this values should come from the payment gateway - pending, failed or complete
      };

      this.wagerService.saveClientWager(noonWagerObj).subscribe((response) => {
        if (response.message === 'done') {
          this.snackBar.open('Your Noon Wager has been booked', 'Close', { 
            duration: 6000,
            panelClass: ['snackbar', 'success']
           });
  
          // refresh balance to update new value
          this.eventEmitterService.refreshButtonClick();
          
          //reset form
          //this.wagerAmount = null;
          this.wagerAmount = 0;
        }
      }, (error) => {
        this.snackBar.open(error.error.message, 'Close', { 
          duration: 6000,
          panelClass: ['snackbar', 'error']
         });
      });
  
    }

     // Calculate implied probability
  public getImpliedProbability(odd: number): number {
    return super.impliedProbability(odd);
  }

  // Get progress bar CSS value
  public progressWidth(odd: number): any {
    return super.setProgressWidth(odd);
  }

  // Get odd strength value
  public oddStrength(odd: number): string {
    return super.setOddStrength(odd);
  }




  ngOnInit(): void {

    // Load coundown timer
    this.afternoonGameCountdown();

    // load todays odds
    this.loadTodayOdds();

    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      this.clientId = user._id;
    }, (error) => {
      console.error(error);
    })

  }

}
