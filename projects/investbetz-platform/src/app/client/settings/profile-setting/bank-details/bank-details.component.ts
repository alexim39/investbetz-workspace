import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { BankDetailsInterface } from './bank-details.interface';
import { BankDetailsService } from './bank-details.service';
import { EventEmitterService } from './../../../../shared/services-module/event-emitter';

import {MatSnackBar} from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../../auth/auth.service';

// Declare jquery as any
declare const $: any;

@Component({
    selector: 'app-bank-details',
    templateUrl: './bank-details.component.html',
    styleUrls: ['./bank-details.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ]),
    ],
    imports: [FormsModule, ReactiveFormsModule, NgIf]
})
export class BankDetailsComponent implements OnInit {

  private user: any //UserDetails;

  // bankForm Values
  bankDetailForm: FormGroup;
  accountNo!: string;
  bankName!: string;

  // loading indicator
  public loading: boolean;

  // status msg
  public errorMessage!: string;
  public successMessage!: string;

  constructor(private auth: AuthService, private bankDetailsService: BankDetailsService, private fb: FormBuilder, private eventEmitterService: EventEmitterService, private snackBar: MatSnackBar) { 
    // off loading indicator
    this.loading = false;

    // bank form formGroup
    this.bankDetailForm = this.fb.group({
      'accountNo': [null, Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])],
      'bankName': [null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
    });

  }

  public bankDetailFormSubmit(post: BankDetailsInterface) {
    // on loading indicator
    this.loading = true;
    // set bank detail object
    const bankDetailsObj: BankDetailsInterface = {
      clientId: this.user._id,
      accountNo: post.accountNo,
      bankName: post.bankName

    }

    this.bankDetailsService.bankDetailsUpdate(bankDetailsObj).subscribe( (response: any) => {
      if (response.message === 'done') {
        //this.successMessage = `Your bank details have been successfully updated`;
        this.snackBar.open(`Your bank details have been successfully updated`, 'Close', { 
          duration: 6000,
          panelClass: ['snackbar', 'success']
         });
        // turn off loading indicator
        this.loading = false;

        // refresh balance to update new value
        this.eventEmitterService.refreshClientProfileClick();
        return;
      }
      
    }, (error) => {
      //this.errorMessage = error.error.message;
      this.snackBar.open(error.error.message, 'Close', { 
        duration: 6000,
        panelClass: ['snackbar', 'error']
       });
      // turn off loading indicator
      this.loading = false;
    });
    
  }

  ngOnInit(): void {

    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      this.user = user;

      this.accountNo = user.accountNo;
      this.bankName = user.bankName;
      
    }, (error) => {
      console.error(error);
    })

  }

}
