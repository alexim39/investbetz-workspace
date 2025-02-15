import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import {MatPaginator} from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatFooterCellDef, MatFooterCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatFooterRowDef, MatFooterRow } from '@angular/material/table';

import { HistoryClass } from '../history.class';

import { WithdrawalHistoryService } from './withdrawal-history.service';
import { WithdrawalHistoryInterface } from './withdrawal-history.interface';

import { EventEmitterService } from './../../../shared/services-module/event-emitter';
import { NgIf, NgClass, TitleCasePipe, CurrencyPipe, DatePipe } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-withdrawal-history',
    templateUrl: './withdrawal-history.component.html',
    styleUrls: ['./withdrawal-history.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(1000)),
        ]),
    ],
    imports: [NgIf, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatSortHeader, MatFooterCellDef, MatFooterCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, NgClass, MatFooterRowDef, MatFooterRow, MatPaginator, TitleCasePipe, CurrencyPipe, DatePipe]
})
export class WithdrawalHistoryComponent extends HistoryClass implements OnInit {

  public displayedColumns: string[] = ['position', 'Amount', 'Bank', 'Account', 'Date', 'Status', 'Action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // init empty response
  public isEmptyResponse!: Boolean;

  private clientId!: string;

  public withdrawals!: MatTableDataSource<WithdrawalHistoryInterface>;
  public disable!: boolean;
  public totalWithdrawal!: number;

  // status msg
  public errorMessage!: string;
  public successMessage!: string;


  constructor(private auth: AuthService, private withdrawalHistoryService: WithdrawalHistoryService, private eventEmitterService: EventEmitterService) {
    super();
  }

  ngOnInit() {
    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      this.clientId = user._id;
      this.withdrawRequest(this.clientId);
    }, (error) => {
      console.error(error)
    })
  }


  // check for empty response
  private emptyResponse(array: any) {

    if (array.length === 0) {
      // array empty or does not exist
      this.isEmptyResponse = false;
    }else{
      this.isEmptyResponse = true;
    }
  }

  // get client withdraw request
  private withdrawRequest(clientId: string) {
    this.withdrawalHistoryService.getWithdrawRequest(clientId).subscribe((response: any) => {

      if (response.message === 'done') {

        // check empty response
        this.emptyResponse(response.data);

        // sort arrays by date to return recent first
        const sortedResult =  response.data.sort((a: any, b: any) => {
          return <any>new Date(b.withdrawDate) - <any> new Date(a.withdrawDate);
        });

        // Assign the data to the data source for the table to render
        this.withdrawals = new MatTableDataSource(sortedResult);

        setTimeout(() => this.withdrawals.paginator = this.paginator);
        setTimeout(() => this.withdrawals.sort = this.sort);

        // get total sum of deposit
        this.totalWithdrawal = super.getTotalWithdrawal(response.data);
      }


    }, (error) => {
      console.error(error);
    });
  }


  // apply filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.withdrawals.filter = filterValue.trim().toLowerCase();

    if (this.withdrawals.paginator) {
      this.withdrawals.paginator.firstPage();
    }
  }


  public cancelWithdrawal(withdrawId: string) {
    this.withdrawalHistoryService.cancelWithdrawRequest(withdrawId).subscribe((response: any) => {

      if (response.message === 'done') {

        // refresh balance to update new value
        this.eventEmitterService.refreshButtonClick();

        // reload the withdraw table
        this.withdrawRequest(this.clientId);
      }

    }, (error) => {
      console.error(error);
    });
  }

  // Pending withdrawal
  public setPendingCSS(status: string): boolean {
    if (status === 'pending') {
      this.disable = false;
      return true;
    }
    return false;
  }

  // Completed withdrawal
  public setCompletedCSS(status: string): boolean {
    if (status === 'completed') {
      this.disable = true;
      return true;
    }
    return false;
  }

  // Rejected withdrawal
  public setRejectedCSS(status: string): boolean {
    if (status === 'rejected') {
      this.disable = true;
      return true;
    }
    return false;
  }
}
