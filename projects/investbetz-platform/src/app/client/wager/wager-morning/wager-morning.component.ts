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
    selector: 'app-wager-morning',
    templateUrl: './wager-morning.component.html',
    styleUrls: ['./wager-morning.component.scss'],
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
export class WagerMorningComponent extends WagerClass implements OnInit {

  private clientId!: string;

  // Init odd values
  public morningOdd!: number; // morning odd
  public morningDate!: string;
  public wagerId!: string;

  // status msg
  public errorMessage!: string;
  public successMessage!: string;

  // init wager amount submit btn
  public wagerSubmitBtn: boolean;

  // init expired color
  public isExpired: boolean;

  // init countdown
  public morningCountdown!: string;

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
    // change expired odd color
    this.isExpired = false;
  }

  // load today odds
  private loadTodayOdds() {
    // get morning odds
    this.wagerService.getMorningOdds().subscribe((response) => {
      if (response.message === 'done') {
        // Set odds to DOM
        this.morningOdd = response.wager[0].odd;
        //this.morningDate = response.wager[0].fullDate;
        this.wagerId = response.wager[0]._id;
      }
    }, (error) => {
      console.error(error);
    });
  }


  // Morning Count down timer
  private morningGameCountdown() {

    this.wagerService.getMorningOdds().subscribe((response) => {

      // Set the date we're counting down to
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
        this.morningCountdown = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          this.morningCountdown = 'ALREADY EXPIRED';
          // Disable submit button when time is expired
          this.wagerSubmitBtn = true;
          // change expired odd color
          this.isExpired = true;
        }
      }, 1000);

    }, (error) => {
      console.log(error);
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
  this.wagerPayoutAmount = wagerAmount * this.morningOdd;
  // Get amount after calculating payout percentage
  this.amountPayable = super.paybleAmount(this.wagerPayoutAmount);
}



  // submit morning odd btn click
  public submitMorningOdd() {

    // morning odd object
    const morningWagerObj: InvestmntInterface = {
      clientId: this.clientId,
      amount: this.wagerAmount,
      investedFrom: 'deposit',
      period: 1,
      plan: 'Wager',
      wager: this.wagerId,
      transactionId: super.generateTransactionId(),
      transactionStatus: 'completed', // Note: this values should come from the payment gateway - pending, failed or complete
    };

    this.wagerService.saveClientWager(morningWagerObj).subscribe((response) => {
      if (response.message === 'done') {
        this.snackBar.open('Your Morning Wager has been booked', 'Close', { 
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
  public progressWidth(odd: number): object {
    return super.setProgressWidth(odd);
  }

  // Get odd strength value
  public oddStrength(odd: number): string {
    return super.setOddStrength(odd);
  }


  ngOnInit(): void {

    // Load coundown timer
    this.morningGameCountdown();

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
