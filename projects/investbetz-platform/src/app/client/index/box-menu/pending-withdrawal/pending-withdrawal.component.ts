import { Component, OnInit } from '@angular/core';
import { WithdrawalHistoryService } from './../../../history/withdrawal/withdrawal-history.service';

import { BoxMenuClass } from './../box-menu.class';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../../../auth/auth.service';

// declare jquery as any
declare const $: any;

@Component({
    selector: 'app-pending-withdrawal',
    templateUrl: './pending-withdrawal.component.html',
    styleUrls: ['./pending-withdrawal.component.scss'],
    imports: [CurrencyPipe]
})
export class PendingWithdrawalComponent extends BoxMenuClass implements OnInit {

  // init withdraw request
  public withdrawal: number;

  constructor(
    private auth: AuthService, 
    private withdrawalHistoryService: WithdrawalHistoryService
  ) { 
    super()

    this.withdrawal = 0;
  }

  // get client withdraw request
  private withdrawRequest(clientId: string) {
    this.withdrawalHistoryService.getWithdrawRequest(clientId).subscribe((response: any) => {

      if (response.message === 'done') {

        // get total sum of pending withdraw request
        this.withdrawal = super.getTotalPendingWithdrawal(response.data);
      }

      
    }, (error) => {
      console.error(error);
    });
  }

  ngOnInit(): void {
    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      const clientId = user._id;
      this.withdrawRequest(clientId);
    }, (error) => {
      console.error(error)
    })
  }

}
