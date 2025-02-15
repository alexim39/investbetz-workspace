import { UserDashboardClass } from '../client.class';

export class InvestmntClass extends UserDashboardClass { // UserDashboardClass is technically User class

  constructor() {
    super()
  }

  // generate transaction id
  protected generateTransactionId (): number { // Generate unique random numbers as investmntId using the passed in current time seconds
    return 1 + Math.floor(Math.random() * 999999999);
  }


}
