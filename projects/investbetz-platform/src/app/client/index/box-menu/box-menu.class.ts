import { UserDashboardClass } from '../../client.class';

export class BoxMenuClass extends UserDashboardClass {

  constructor() {
    super();
  }

  // Get sum of objects time property
  public getObjectTimePropertySum(investment: any) {
    // get sum of time prop across all objects in array
    const total = investment.reduce((prev: any, cur: any) => {
      return prev + cur.period;
    }, 0);
    // return average of time
    return total / investment.length;
  }

  protected getPrincipal(principal: any, investment: any) {
    return principal / investment.length;
  }

  // Get sum of amount property for withdrawal object
  public getTotalPendingWithdrawal(withdrawals: any): number{
    let sum = 0;

    withdrawals.forEach((withdrawal: any) => {
      if (withdrawal.withdrawStatus == 'pending') {
        sum += +withdrawal.withdrawAmount;
      }
    })
    return sum;
  }

}
