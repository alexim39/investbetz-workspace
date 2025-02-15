import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashoutComponent } from './cashout/cashout.component';
import { CashupComponent } from './cashup/cashup.component';
import { InvestmntComponent } from './investmnt.component';

const routing: Routes = [
    { path: 'investments',
      children: [
        { path: '', component: InvestmntComponent },
        { path: 'plans', component: InvestmntComponent },
        { path: 'cashout', component: CashoutComponent },
        { path: 'cashup', component: CashupComponent },
      ]
    },
];

@NgModule({
  imports: [
    RouterModule.forChild(routing),
  ],

  exports: [RouterModule]
})
export class InvestmntRoutingModule {}
