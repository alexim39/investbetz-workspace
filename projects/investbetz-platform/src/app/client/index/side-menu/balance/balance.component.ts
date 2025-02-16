import { Component, OnInit } from '@angular/core';

import { BalanceService } from './balance.service';
import { EventEmitterService } from './../../../../shared/services-module/event-emitter';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../../../auth/auth.service';

@Component({
selector: 'async-balance',
template: `
<li (click)="refreshBalance()">
  <div class="subheader center-left trucate">
    <span>
      <i title="Refresh balance" class="material-icons">refresh</i>
    </span> 
    Bal: {{totalBalance | currency:'NIG':'&#8358;'}} / 
    <small>Withdrawable: <i>{{withdrawable | currency:'NIG':'&#8358;'}}</i></small>
  </div>
</li>
`,
styles: [`
li {
  cursor: pointer;
  div {
    margin-left: 1.8em;
    span {
      font-size: 1.2em;
      top: 0.2em;
      position: relative;
      z-index: 1000 !important;
      i {
        font-size: 0.8em;
      }
    }
    small {
      i {
        font-weight: bold;
      }
    }
  }
}
`],
imports: [CurrencyPipe],
providers: [BalanceService]
})
export class BalanceComponent implements OnInit {

  public totalBalance: number;
  public withdrawable: number;
  private clientId!: string;

  constructor(
    private auth: AuthService, 
    private balanceService: BalanceService, 
    private eventEmitterService: EventEmitterService
  ) {

    this.totalBalance = 0;
    this.withdrawable = 0;
  }

  // Refresh deposit account balance
  public refreshBalance() {
    // deposit account balance
    this.getDepositAccountBalance(this.clientId);
    this.getWithdrawableAccountBalance(this.clientId);
  }

  // get client deposit balance
  private getDepositAccountBalance(clientId: string): void {
    this.balanceService.getClientDepositAccountBalance(clientId).subscribe((response: any) => {
      if (response.message === 'done') {
        this.totalBalance = response.data[0].balance;
      }
    }, (error) => {
      console.error(error)
    })
  }

  // get client withdrawable balance
  private getWithdrawableAccountBalance(clientId: string): void {
    this.balanceService.getClientWithdrawableAccountBalance(clientId).subscribe((response: any) => {
      if (response.message === 'done') {
        this.withdrawable = response.data;
      }
      
    }, (error) => {
      console.error(error)
    })
  }

  ngOnInit() {
    
    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      this.clientId = user._id;
      // call get balance
      this.getDepositAccountBalance(this.clientId);
      this.getWithdrawableAccountBalance(this.clientId);
    }, (error) => {
      console.error(error);
    })

    // call refresh method from event emitter service
    if (this.eventEmitterService.subsVar == undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.refreshDepositAccountBalance.subscribe(() => {    
        this.refreshBalance();    
      });    
    }

  }

}
