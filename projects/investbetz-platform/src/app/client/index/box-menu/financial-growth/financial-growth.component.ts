import { Component, OnInit } from '@angular/core';
import { InvestmentHistoryService } from './../../../history/investment/investment-history.service';

import { BoxMenuClass } from './../box-menu.class';
import { PercentPipe } from '@angular/common';
import { AuthService } from '../../../../auth/auth.service';

// declare jquery as any
declare const $: any;

@Component({
    selector: 'app-financial-growth',
    templateUrl: './financial-growth.component.html',
    styleUrls: ['./financial-growth.component.scss'],
    imports: [PercentPipe]
})
export class FinancialGrowthComponent extends BoxMenuClass implements OnInit {

  // init total active deposit amount
  private totalActivePlanDeposit: number;

  // init financial growth
  public fgb!: number;


  private interest!: number; // Sum of amounts paid as interest (I)
  private time!: number; // Sum of days of inverstment periods (T)
  //private principal: number;  // Sum of amounts invested (P)

  constructor(
    private auth: AuthService, 
    private investmntHistoryService: 
    InvestmentHistoryService
  ) {
    super()

    this.totalActivePlanDeposit = 0;
   }

   // get client investment histories
  private getInvestmentHistories(clientId: string) {
    
    this.investmntHistoryService.getHistory(clientId).subscribe((response: any) => {
      
      if (response.message === 'done') {

        this.getInvestedAmounts(response.data);

        this.time = super.getObjectTimePropertySum(response.data); // returns summed average of time period

        this.setFinancialGrowth(response.data);

      }
      
    }, (error) => {
      console.error(error);
    });

  }

  private getInvestedAmounts(investmnts: any) {
    for (let i = 0; i < investmnts.length; i++) { // Loop through objects
      // Call getProfit() Method
      this.setDeposits(investmnts[i].plan, investmnts[i].start, investmnts[i].amount, investmnts[i].period);
    }
  }

  private setDeposits(plan: string, startDate: Date, amount: number, period: number): void {

    //const daysPast =  super.getDaysPast(startDate);

    // Check if its a closed deal
    if (super.getUserClosedDeals(startDate, period)) {
      return; // return null for closed deal
    } else {
      // If its a running deal
      if (plan === 'Cashout') {
        //const profit = daysPast * amount * super.get_X_Percent(2); // 2% of amount
        //this.totalActivePlanProfit = this.totalActivePlanProfit + profit;
        this.totalActivePlanDeposit = this.totalActivePlanDeposit + amount;
        this.interest = amount * super.get_X_Percent(2);
        return;
      }
      if (plan === 'Cashup') {
        //const profit = daysPast * amount * super.get_X_Percent(1); // 1% of amount
        //this.totalActivePlanProfit = this.totalActivePlanProfit + profit;
        this.totalActivePlanDeposit = this.totalActivePlanDeposit + amount;
        this.interest = amount * super.get_X_Percent(1);
      }
      if (plan === 'Wager') {
        this.totalActivePlanDeposit = this.totalActivePlanDeposit + amount;
      }
    }

  }


  private setFinancialGrowth(investmnts: any) {

    const principal = super.getPrincipal(this.totalActivePlanDeposit, investmnts); // returns sum of average principal amount

    /* Using the formula r = i/pt for calculating interest rate */
    const rate = (this.interest / investmnts.length)  / (principal * this.time);
    this.fgb = rate * 100;
  }

  ngOnInit(): void {
    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      const clientId = user._id;

      this.getInvestmentHistories(clientId)
    }, (error) => {
      console.error(error);
    })
  }

}
