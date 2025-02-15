//import { constants } from "buffer";

export class Client { 

  constructor() {}

  public isOutOfDepositRage(amount: number): boolean {
    if ( amount >= 3000 && amount <= 100000 ) { // Only activate btn when value is >= 3000
      return false;
    } else { //  if ( value < 3000 ) {
      return true;
    }
  }

  // Get sum of amount property in deposit object
  public getCurrentBalance(balanceObjs: any): number {
    let total: number = 0;
    balanceObjs.forEach((balanceObj: any) => {
      //if (deposit.transactionStatus == 'completed') {
        total += +balanceObj.balance;
      //}
    })
    return total;
  }

  public isAccountBalanceFounded(investmentAmount: number, totalDeposit: number): boolean {
    if (investmentAmount > totalDeposit || totalDeposit <= 0) {
      return false
    } if (investmentAmount < totalDeposit || totalDeposit !== 0)  {
      return true;
    } else {
      return false;
    }
  }

  // get the number of days past from investment date - used for calculating withdrawable balance
  private numberOfDaysPast(startDate: Date): number {
    // The number of milliseconds in one day
    const oneDay = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    const todayDate = new Date();
    const strtDate = new Date(startDate);

    // Days past since the day of registration in milliseconds
    const daysPast = (todayDate.getTime() - strtDate.getTime()) / (oneDay);

    // return days past in days
    return Math.round(Math.abs(daysPast));
  }

  // get the closed deals for each investment
  public isClosedDeals(startDate: Date, period: number): boolean {
    const daysPast = new Client().numberOfDaysPast(startDate);

    // Days left
    const daysLeft =  period - daysPast;
    if (daysLeft <= 0) {
      return true;
    }
    return false;
  }

  // Get x (1) percent value
  public get_X_Percent(percent: number):number {
    return percent / 100;
  }

  // Get x (2) percent of amount (5000)
  protected get_X_PercentageOf_Amount(percent: number, amount: number): number {
    return (percent / 100) * amount;
  }

  protected paybleAmount(amount: number): number {
      const clientBalanceClass = new Client();
      
      return amount - clientBalanceClass.get_X_PercentageOf_Amount(2, amount);
  }

  protected getWagerPayout(wager: any, odd: number, amount: number): number {

    const clientBalanceClass = new Client();
    
    if (clientBalanceClass.isInArray(wager.games.game, 'lose')) {
      return 0;
    } else if (clientBalanceClass.isInArray(wager.games.game, 'win')) {
      return clientBalanceClass.paybleAmount(odd * amount);
    } else if (clientBalanceClass.isInArray(wager.games.game, 'running')) {
      return 0;
    } else {
      return 0
    }

  }

  protected isInArray(array: any, search: string) {
    let newArray: any = [];

    array.forEach(  ( games: any) => {
      newArray.push(games.status);
    });

    //console.log(newArray) //['win', 'lose', 'win']
    return newArray.indexOf(search) >= 0;
  }



}