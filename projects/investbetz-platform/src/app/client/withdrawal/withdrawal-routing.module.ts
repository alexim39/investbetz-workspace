/* import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithdrawalComponent } from './withdrawal.component';
import { AutoWithdrawComponent } from './auto-withdraw/auto-withdraw.component';

const routing: Routes = [
    { path: 'withdrawal',
    children: [
      { path: '', component: WithdrawalComponent },
      { path: 'auto-withdraw', component: AutoWithdrawComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routing),
  ],

  exports: [RouterModule]
})
export class WithdrawalRoutingModule {}
 */