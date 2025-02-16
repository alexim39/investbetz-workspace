import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { WithdrawService } from './withdrawal.service';
import { WithdrawInterface } from './withdrawal.interface';

import { EventEmitterService } from './../../../shared/services-module/event-emitter';

import {MatSnackBar} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

// declare jquery as any
declare const $: any;

@Component({
    selector: 'app-withdrawal',
    templateUrl: './withdrawal.component.html',
    styleUrls: ['./withdrawal.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ]),
    ],
    imports: [FormsModule, RouterLink]
})
export class WithdrawalComponent implements OnInit {

  private user: any; //UserDetails;

  // Submit Btn state
  public isWithdrawRange: boolean;

  // withdrawal properties
  public bankName!: string;
  public accountNo!: string;
  private withdrawableBalance!: number;

  withdrawable!: number;

  constructor(private auth: AuthService, private withdrawService: WithdrawService, private eventEmitterService: EventEmitterService, private snackBar: MatSnackBar) {
    // Init Btn
    this.isWithdrawRange = true;
  }

  // if value is less than 1000, greater than 100,000, bankname not defined, account number not define then diable btn
  public checkWithdrawProperties(withdrawAmount: number | any): void {
    if ( withdrawAmount >= 1000 && withdrawAmount <= 1000000 && this.bankName !== undefined && this.accountNo !== undefined) { // Only activate btn when value is >= 1000
      this.isWithdrawRange = false;
    } else { 
      this.isWithdrawRange = true;
    }
  }

  // get the current client withdrawable balance
  private getCurrentWithdrawableBalance(clientId: string): void{
    this.withdrawService.getClientWithdrawableBalance(clientId).subscribe((response: any) => {
      
      if (response.message === 'done') {
        this.withdrawableBalance = response.data;
      }
      
    }, (error) => {
      console.error(error);
    });
  }

  public makeWithdraw(withdrawAmount: number | any) {

    // Check if client have sufficient balance
    if (this.withdrawableBalance >= withdrawAmount && this.withdrawableBalance > 0) {
      // continue withdrawal

      const withdrawObj: WithdrawInterface = {
        clientId: this.user._id,
        withdrawAmount: withdrawAmount,
        bankName: this.bankName,
        accountNo: this.accountNo,
        withdrawStatus: 'pending'
      };

      this.withdrawService.submitWithdrawalRequest(withdrawObj).subscribe((response: any) => {
        if (response.message === 'done') {
          //this.successMessage = 'Your withdrawal request has been submitted successfully';
          this.snackBar.open('Your withdrawal request has been submitted successfully', 'Close', { 
            duration: 6000,
            panelClass: ['snackbar', 'success']
          });
          // disable btn
          this.isWithdrawRange = true

          // refresh balance to update new value
          this.eventEmitterService.refreshButtonClick();
        }
      }, (error) => {
        console.log(error)
        //this.errorMessage = error.error.message;
        this.snackBar.open(error.error.message, 'Close', { 
          duration: 6000,
          panelClass: ['snackbar', 'error']
         });
      });

      
    } else {
      //this.errorMessage = `Your withdraw amount is greater than available withdrawable balance`;
      this.snackBar.open(`Your withdraw amount is greater than available withdrawable balance`, 'Close', { 
        duration: 6000,
        panelClass: ['snackbar', 'error']
       });
    }
   

    /* Check if user has made more than one withdrawal in a day */
    

    
  }


  ngOnInit() {
    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      this.user = user;

      const clientId = user._id;
      this.accountNo = user.accountNo;
      this.bankName = user.bankName;

      this.getCurrentWithdrawableBalance(clientId);
      
    }, (error: Error) => {
      console.error(error);
    })

    $(document).ready(() => {
      // Init select element
      $('select').formSelect();
      // Set Label Active For Materialize form: Make lable clear off the form
      $('.bank').addClass('active');

      // Init word count
      // $('input#input_text, textarea#textarea2').characterCounter();
      $('input#accountno').characterCounter();
    });
  }

}
