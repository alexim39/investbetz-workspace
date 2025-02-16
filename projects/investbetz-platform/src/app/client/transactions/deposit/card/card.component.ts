import { Component, OnInit } from '@angular/core';
import { DepositInterface } from './../deposit.interface';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { CardService } from './card.service';
import { EventEmitterService } from './../../../../shared/services-module/event-emitter';

import {MatSnackBar} from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../auth/auth.service';

// declare jquery as any
declare const $: any;

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
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
export class CardComponent implements OnInit {

  public cardDepositEmail!: string;
  public depositAmount!: number;
  public cardDepositField!: number;
  private clientId!: string;

  // status msg
  public errorMessage!: string;
  public successMessage!: string;

  // Submit Btn
  cardDepositBtn: boolean;

  constructor(private auth: AuthService, private cardService: CardService, private eventEmitterService: EventEmitterService, private snackBar: MatSnackBar ) { 
    // disable btn
    this.cardDepositBtn = true;
  }

  public cardDepositSubmit(method = 'Card') {
    // disable btn
    this.cardDepositBtn = true;

    const cardDeposit: DepositInterface = {
      clientEmail: this.cardDepositEmail,
      depositAmount: this.cardDepositField,
      clientId: this.clientId,
      transactionId: this.cardService.transactionId(),
      transactionMethod: method,
      transactionStatus: 'completed'
    };

    // process deposit
    this.cardService.deposit(cardDeposit).subscribe((response: any) => {
      if (response.message === 'done') {
        //this.successMessage = 'Your deposit transaction was successful';
        this.snackBar.open('Your deposit transaction was successful', 'Close', { 
          duration: 6000,
          panelClass: ['snackbar', 'success']
         });

        // refresh balance to update new value
        this.eventEmitterService.refreshButtonClick();
      }
    }, (error) => {
      //this.errorMessage = error.error.error; //'Your deposit was not successfully recoded';
      this.snackBar.open(error.error.error, 'Close', { 
        duration: 6000,
        panelClass: ['snackbar', 'error']
       });
    })
  }

  public setDepositAmount(value: number | any) {
    if ( value >= 3000 && value <= 100000 ) { // Only activate btn when value is >= 3000
      this.cardDepositBtn = false;
    } else { //  if ( value < 3000 ) {
      this.cardDepositBtn = true;
    }
  }

  ngOnInit() {
    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      this.cardDepositEmail = user.email;
      this.clientId = user._id;
    }, (error: Error) => {
      // disable btn
      this.cardDepositBtn = true;
    })

    // Set Label Active For Materialize form: Make lable clear off the form
    $('.emailLabel').addClass('active');
  }

}
