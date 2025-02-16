import { Component, OnInit } from '@angular/core';
import { AutoWithdrawInterface } from './auto-withdraw.interface';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WithdrawService } from './../withdrawal.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';

// declare jquery as any
declare const $: any;

@Component({
    selector: 'app-auto-withdraw',
    templateUrl: './auto-withdraw.component.html',
    styleUrls: ['./auto-withdraw.component.scss'],
    imports: [RouterLink, FormsModule, ReactiveFormsModule]
})
export class AutoWithdrawComponent implements OnInit {

  // signUpForm Values
  public autoWithdrawForm: FormGroup;

  private user: any; //UserDetails;

  // withdrawal properties
  public bankName!: string;
  public accountNo!: string;

  // Submit Btn state
  public isWithdrawRange: boolean;

  // format current date into: 2020-09-09
  public todayDate: any = new Date().getFullYear() + "-" + ("0"+(new Date().getMonth()+1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2) ; //2020-09-09

  constructor(private auth: AuthService, private withdrawService: WithdrawService, private fb: FormBuilder, private snackBar: MatSnackBar){ 
    // Init Btn
    this.isWithdrawRange = true;

    // autoWithdrawForm formGroup
    this.autoWithdrawForm = this.fb.group({
      'withdrawAmount': [null, Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(7)
      ])],
      'bankName': [null, Validators.compose([
        Validators.required,
      ])],
      'isAutomatic': [false, Validators.compose([
        //Validators.requiredTrue,
      ])],
      'accountNo': [null, Validators.compose([
        Validators.required,
        Validators.maxLength(10),
      ])],
      'autoWithdrawDate': [null, Validators.compose([
        Validators.required
      ])],
      'isMonthly': [false, Validators.compose([
        //Validators.requiredTrue
      ])],
    });
  }

  // if value is less than 1000, greater than 100,000, bankname not defined, account number not define then diable btn
  public checkWithdrawProperties(withdrawAmount: number | any): void {
    if ( withdrawAmount >= 1000 && withdrawAmount <= 1000000 && this.bankName !== undefined && this.accountNo !== undefined) { // Only activate btn when value is >= 1000
      this.isWithdrawRange = false;
    } else { 
      this.isWithdrawRange = true;
    }
  }

  public autoWithdrawSubmit(post: AutoWithdrawInterface) {
    
    const withdrawObj: AutoWithdrawInterface = {
      // Member properties
      clientId: this.user._id,
      withdrawAmount: post.withdrawAmount,
      bankName: post.bankName,
      isAutomatic: post.isAutomatic,
      accountNo: post.accountNo,
      autoWithdrawDate: post.autoWithdrawDate,
      isMonthly: post.isMonthly
    }

    // check if auto withdraw switch is turned on
    if (post.isAutomatic === false) {
      this.snackBar.open('You must turn on auto withdraw switch', 'Close', { 
        duration: 6000,
        panelClass: ['snackbar', 'error']
      });
    } else {

      this.withdrawService.setAutomaticWithdraw(withdrawObj).subscribe( (response: any) => {
        if (response.message === 'done') {
          this.snackBar.open(`Your automatic withdraw settings have been updated`, 'Close', { 
            duration: 6000,
            panelClass: ['snackbar', 'success']
           });
  
           // reset form
           this.autoWithdrawForm.reset();
        }    
        
      }, (error) => {
        this.snackBar.open(error.message, 'Close', { 
          duration: 6000,
          panelClass: ['snackbar', 'error']
        });
      });

    }
  }

  ngOnInit() {

    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      this.user = user;

      //const clientId = user._id;
      this.accountNo = user.accountNo;
      this.bankName = user.bankName;
      
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
