import { Component, OnInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatFooterCellDef, MatFooterCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatFooterRowDef, MatFooterRow } from '@angular/material/table';

import { HistoryClass } from '../history.class';
import { DepositHistoryService } from './deposit-history.service';
import { NgIf, NgClass, TitleCasePipe, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-deposit-history',
    templateUrl: './deposit-history.component.html',
    styleUrls: ['./deposit-history.component.scss'],
    imports: [NgIf, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatSortHeader, MatFooterCellDef, MatFooterCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, NgClass, MatFooterRowDef, MatFooterRow, MatPaginator, RouterLink, TitleCasePipe, CurrencyPipe, DatePipe]
})
export class DepositHistoryComponent extends HistoryClass implements OnInit {

  public displayedColumns: string[] = ['position', 'investmentId', 'amount', 'transactionDate', 'status', 'method'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

   // init empty response
   public isEmptyResponse!: Boolean;

  public histories!: MatTableDataSource<any>;

  public totalDeposit!: number;

  constructor(private auth: AuthService, private depositHistoryService: DepositHistoryService) {
    super();
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

  // get client deposit balance
  private getDeposits(clientId: string) {
    this.depositHistoryService.getClientDeposit(clientId).subscribe((response: any) => {
      if (response.message === 'done') {

        // check empty response
        this.emptyResponse(response.data);

        // sort arrays by date to return recent first
        const sortedResult =  response.data.sort((a: any, b: any) => {
          return <any>new Date(b.depositDate) - <any> new Date(a.depositDate);
        });

        // Assign the data to the data source for the table to render
        this.histories = new MatTableDataSource(sortedResult);

        setTimeout(() => this.histories.paginator = this.paginator);
        setTimeout(() => this.histories.sort = this.sort);

      }
      // get total sum of deposit
      this.totalDeposit = super.getTotalDeposit(response.data);
    }, (error) => {
      console.error(error)
    })
  }


  // apply filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.histories.filter = filterValue.trim().toLowerCase();

    if (this.histories.paginator) {
      this.histories.paginator.firstPage();
    }
  }


  ngOnInit() {
    // Load Current User Details
    this.auth.profile().subscribe((user: any) => {
      const clientId: string = user._id;
      // call get balance
      this.getDeposits(clientId)
    }, (error: Error) => {
      console.error(error);
    })
  }

  // Pending withdrawal
  public setPendingCSS(status: string): boolean {
    if (status === 'pending') {
      return true;
    }
    return false;
  }

  // Completed withdrawal
  public setCompletedCSS(status: string): boolean {
    if (status === 'completed') {
      return true;
    }
    return false;
  }

  // Rejected withdrawal
  public setRejectedCSS(status: string): boolean {
    if (status === 'rejected') {
      return true;
    }
    return false;
  }

}
