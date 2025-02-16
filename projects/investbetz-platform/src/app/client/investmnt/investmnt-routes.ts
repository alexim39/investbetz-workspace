import { Routes } from '@angular/router';
import { CashoutComponent } from './cashout/cashout.component';
import { CashupComponent } from './cashup/cashup.component';
import { InvestmntComponent } from './investmnt.component';
import { InvestmentHistoryComponent } from './history/history.component';

export const PlanRouting: Routes = [
  { path: '',
    children: [
      { path: '', component: InvestmntComponent },
      { path: 'plans', component: InvestmntComponent },
      { path: 'cashout', component: CashoutComponent },
      { path: 'cashup', component: CashupComponent },
      { path: 'active', component: InvestmentHistoryComponent },
    ]
 },
];
