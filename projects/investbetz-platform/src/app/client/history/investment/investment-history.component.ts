import { Component, OnInit,  ViewChild, Inject } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
// declare jquery as any
declare const $: any;

import {MatPaginator} from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

import { HistoryClass } from '../history.class';

import { InvestmentHistoryService } from './investment-history.service';
import { InvestmntInterface } from './../../investmnt/investmnt.interface';

import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgClass, NgFor, UpperCasePipe, TitleCasePipe, CurrencyPipe, DatePipe, KeyValuePipe } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-investment-history',
    templateUrl: './investment-history.component.html',
    styleUrls: ['./investment-history.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    imports: [NgIf, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatSortHeader, NgSwitch, NgSwitchCase, NgSwitchDefault, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, NgClass, MatPaginator, CurrencyPipe, DatePipe]
})
export class InvestmentHistoryComponent extends HistoryClass implements OnInit {

  public displayedColumns: string[] = ['position', 'investmentId', 'plan', 'amount', 'period', 'startDate', 'endDate', 'daysPast', 'daysLeft', 'profit', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // init empty response
  public isEmptyResponse!: Boolean;

  public histories!: MatTableDataSource<InvestmntInterface>;
  private viewDetailedHistory!: Array<any>;
  public historiesDetails!: InvestmntInterface;

  // balance: number;
  totalProfit: number;
  totalDeposit: number;

  isTableExpanded = false;

  constructor(private auth: AuthService, private investmntHistoryService: InvestmentHistoryService) {
    super();
    // Init totalProfit/totalDeposit
    this.totalProfit = 0;
    this.totalDeposit = 0;
  }

  ngOnInit(): void {

    // Load Current Client Details
    this.auth.profile().subscribe((user: any) => {
      const clientId = user._id;
      // call investment history
      this.getInvestmntHistory(clientId)
    }, (error: Error) => {
      console.error(error);
    })

    // init modal
    $(document).ready(() => {
      $('.modal').modal({
        opacity: 0.8,
        dismissible: false
      });
    });

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


  // Get current user investments histories
  private getInvestmntHistory(clientId: string) {
    this.investmntHistoryService.getHistory(clientId).subscribe((response: any) => {

      console.log('history=== ',response)

      if (response.message === 'done') {

        // check empty response
        this.emptyResponse(response.data);

       let metchedArray: Array<any> = [];



        // loop through response data to check for game result status
        response.data.forEach((history: any) => {
          if (history.plan === 'Wager') {
            // if transaction is wager

            history.wager.games.game.forEach((game: any) => {
              if (game.status === 'win') {
                // modify the outcome value of wager array
                game.status = 'win';
              }
              if (game.status === 'lose') {
                // modify the outcome value of wager arryay
                game.status = 'lose';

              }
              if (game.status === '') {
                // modify the outcome value of wager array
                game.status = 'running';
              }

            })
            metchedArray.push(history)

            // if transaction is not wager
          } else {
           metchedArray.push(history)
           //console.log(metchedArray)
          }
        })

        // Assign return objects for viewing detailed history
        this.viewDetailedHistory = metchedArray;

         // sort arrays by date to return recent first
         const sortedResult =  response.data.sort((a: any, b: any) => {
          return <any>new Date(b.start) - <any> new Date(a.start);
        });

        console.log('sorted== ',sortedResult)

        // Assign the data to the data source for the table to render
        this.histories = new MatTableDataSource(sortedResult);

        setTimeout(() => this.histories.paginator = this.paginator);
        setTimeout(() => this.histories.sort = this.sort);

      }
    }, (error) => {
      console.error(error);
    });
  }



  // apply filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.histories.filter = filterValue.trim().toLowerCase();

    if (this.histories.paginator) {
      this.histories.paginator.firstPage();
    }
  }

  // Get expiring date
  public expiryDate(startDate: Date, period: number): Date {
    // Get start date
    const strtDate = new Date(startDate);
    return new Date(strtDate.getTime() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * period);
  }

    // Number of days left before expiring
  public numberOfDaysLeft(startDate: Date, period: number): number {
    // Days left
    const daysLeft =  period - super.getDaysPast(startDate);
    if (daysLeft <= 0) {
      return 0;
    }
    return daysLeft;
  }

  // Number of day past
  public getNumberOfDaysPast(startDate: Date, period: number): number {
    if (super.getDaysPast(startDate) > period) {
      return period;
    }
    return super.getDaysPast(startDate);
  }

  public getLessThanOneWeek(startDate: Date, period: number): boolean {
    // Get less than 7 days
    return super.settLessThanOneWeek(7, startDate, period);
  }

  public getLessThanOneMonth(startDate: Date, period: number): boolean {
    // Get less than 30 days
    return super.settLessThanOneMonth(30, startDate, period);
  }




/**
 * Determines whether a wager is lost in a closed deal.
 * Returns true if the wager has a 'lose' outcome, false if it has a 'win' outcome or if the deal is not closed.
 *
 * @param startDate The start date of the deal.
 * @param period The period defining a closed deal.
 * @param wager The wager object containing game outcomes.
 * @returns True if the wager is lost, otherwise false.
 */
public losedWager(startDate: Date, period: number, wager: any): boolean {
  // If the deal isn't closed or the wager is falsy, return false.
  if (!super.getUserClosedDeals(startDate, period) || !wager) {
    return false;
  }
  
  // Check if the wager's games array contains a 'lose' outcome.
  if (super.isInArray(wager.games.game, 'lose')) {
    return true;
  }
  
  // Check if the wager's games array contains a 'win' outcome.
  if (super.isInArray(wager.games.game, 'win')) {
    return false;
  }
  
  // Default return value if neither 'lose' nor 'win' are found.
  return false;
}




/**
 * Determines if a wager is unsettled.
 * Returns true if the user's closed deals (as determined by getUserClosedDeals) and the wager exists
 * and its outcome is null; otherwise, returns false.
 *
 * @param startDate The start date of the deal.
 * @param period The period for which deals are considered closed.
 * @param wager The wager object to check.
 * @returns True if the wager outcome is unsettled; otherwise, false.
 */
public unsettledWager(startDate: Date, period: number, wager: any): boolean {
  if (super.getUserClosedDeals(startDate, period) && wager) {
    return wager.outcome === null;
  }
  return false;
}




/**
 * Calculates the investment profit based on the plan and whether the deal is closed.
 *
 * For a closed deal:
 *  - 'Cashout': profit = period * amount * 2%
 *  - 'Cashup': profit = period * amount * 1%
 *  - 'Wager': profit is calculated using getWagerProfit()
 *
 * For a running deal:
 *  - 'Cashout': profit = daysPast * amount * 2%
 *  - 'Cashup': profit = daysPast * amount * 1%
 *  - 'Wager': profit = 0
 *
 * Updates totalProfit and totalDeposit for Cashout and Cashup plans.
 *
 * @param plan The investment plan ('Cashout', 'Cashup', or 'Wager').
 * @param startDate The start date of the deal.
 * @param amount The invested amount.
 * @param period The period (e.g., number of days) for a closed deal.
 * @param wager The wager object (used for 'Wager' plan).
 * @returns The calculated profit.
 */
public investmentProfit(plan: string, startDate: Date, amount: number, period: number, wager: any): number {
  // Calculate the number of days that have passed since startDate.
  const daysPast = super.getDaysPast(startDate);
  // Determine whether the deal is closed.
  const isClosed = this.closedDeals(startDate, period);

  // Handle the 'Wager' plan separately.
  if (plan === 'Wager') {
    return isClosed ? super.getWagerProfit(wager, wager.odd, amount) : 0;
  }

  // For 'Cashout' and 'Cashup' plans, choose a factor based on whether the deal is closed.
  let factor: number;
  let percent: number;
  if (plan === 'Cashout') {
    factor = isClosed ? period : daysPast;
    percent = 2;
  } else if (plan === 'Cashup') {
    factor = isClosed ? period : daysPast;
    percent = 1;
  } else {
    // For any unrecognized plan, return 0.
    return 0;
  }

  // Calculate profit and update cumulative totals.
  const profit = factor * amount * super.get_X_Percent(percent);
  this.totalProfit += profit;
  this.totalDeposit += amount;
  return profit;
}





  public closedDeals(startDate: Date, period: number): boolean { // Method used to set closed deal on view
    return super.getUserClosedDeals(startDate, period);
  }

  // Get investment status
  public investmentStatus(daysleft: number): string {
    if (daysleft <= 0) {
      return `<small class="expired"><b>Expired</b></small>`;
    }
    if (daysleft === 1) { // If 1 day left
      return `<small class="running">Still Running with a day left to go</small>`;
    }
    return `<small class="running">Still Running with</small> ${daysleft} days <small class="running">left to go</small>`;
  }


  
  /**
 * Returns the investment percentage as a string based on the plan.
 * - For 'Cashout', returns '2%'.
 * - For 'Cashup', returns '1%'.
 * - For 'Wager', returns the wager odd appended with ' odd'.
 * - For any other plan, returns an empty string.
 *
 * @param plan The investment plan.
 * @param wager An object that contains wager details.
 * @returns The investment percentage string.
 */
public investmentPercentage(plan: string, wager: any): string {
  switch (plan) {
    case 'Cashout':
      return '2%';
    case 'Cashup':
      return '1%';
    case 'Wager':
      return `${wager.odd} odd`;
    default:
      return '';
  }
}


  
  /**
 * Calculates the total investment payout amount.
 * - For 'Cashout' or 'Cashup' plans, returns the sum of profit and amount.
 * - For the 'Wager' plan, returns the profit.
 * - For any other plan, returns the profit.
 *
 * @param profit The profit earned.
 * @param amount The invested amount.
 * @param plan The plan type.
 * @returns The total payout amount.
 */
public investmentPayout(profit: number, amount: number, plan: string): number {
  switch (plan) {
    case 'Cashout':
    case 'Cashup':
      return profit + amount;
    case 'Wager':
      return profit;
    default:
      // Return profit as a fallback if plan is unrecognized.
      return profit;
  }
}



  // open modal dialog
  public openDialog(id: string): void {
    // find history object from history array using submitted id
    this.historiesDetails = this.viewDetailedHistory.find(item => item._id === id);
  }

}

