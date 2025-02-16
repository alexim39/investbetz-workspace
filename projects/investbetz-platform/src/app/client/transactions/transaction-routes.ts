import { Routes } from '@angular/router';
import { DepositComponent } from './deposit/deposit.component';
import { CardComponent } from './deposit/card/card.component';
import { BankComponent } from './deposit/bank/bank.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { AutoWithdrawComponent } from './withdrawal/auto-withdraw/auto-withdraw.component';
import { HistoryComponent } from './history/history.component';


export const TransactionRouting: Routes = [
  { path: '',
    children: [
      { path: '', component: HistoryComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'deposit', component: DepositComponent,
        children: [
          { path: '', component: CardComponent },
          { path: 'card', component: CardComponent },
          { path: 'bank', component: BankComponent }
        ]
      },
      { path: 'withdrawal',
        children: [
          { path: '', component: WithdrawalComponent },
          { path: 'auto-withdraw', component: AutoWithdrawComponent }
        ]
      },
    ]
  },
];
