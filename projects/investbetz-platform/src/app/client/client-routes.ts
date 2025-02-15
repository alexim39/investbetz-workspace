import { Routes } from "@angular/router";

import { DashboardComponent } from './dashboard.component';
import { IndexComponent } from './index/index.component';
import { InvestmntComponent } from './investmnt/investmnt.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { HistoryComponent } from './history/history.component';
import { CashoutComponent } from './investmnt/cashout/cashout.component';
import { CashupComponent } from './investmnt/cashup/cashup.component';
import { ProfileSettingComponent } from './settings/profile-setting/profile-setting.component';
import { SecuritySettingComponent } from './settings/security-setting/security-setting.component';
import { WagerComponent } from './wager/wager.component';
import { WagerInfoComponent } from './wager/wager-info/wager-info.component';
import { WagerHistoriesComponent } from './wager/wager-histories/wager-histories.component';
import { DepositComponent } from './deposit/deposit.component';
import { TestimonialComponent } from './feedback/testimonial/testimonial.component';
import { MessagesComponent } from './feedback/messages/messages.component';
import { NewMsgComponent } from './feedback/messages/new-msg/new-msg.component';
import { ReadMsgComponent } from './feedback/messages/read-msg/read-msg.component';
import { CardComponent } from './deposit/card/card.component';
import { BankComponent } from './deposit/bank/bank.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { AutoWithdrawComponent } from './withdrawal/auto-withdraw/auto-withdraw.component';
import { CopybetComponent } from './copybet/copybet.component';
// import {WagersUploadComponent} from './administrator/wagers/wagers-upload/wagers-upload.component';
// import {WagersUpdateComponent} from './administrator/wagers/wagers-update/wagers-update.component';
// import {WithdrawMgtComponent} from './administrator/financials/withdraw-mgt/withdraw-mgt.component';
// import {LoanMgtComponent} from './administrator/financials/loan-mgt/loan-mgt.component';
// import {DepositMgtComponent} from './administrator/financials/deposit-mgt/deposit-mgt.component';

export const DashboardRouting: Routes = [
  { path: '', component: DashboardComponent, // Part name is empty cos of lazy loading
    children: [
     { path: '', component: IndexComponent },

     { path: 'investments',
        children: [
          { path: '', component: InvestmntComponent },
          { path: 'plans', component: InvestmntComponent },
          { path: 'cashout', component: CashoutComponent },
          { path: 'cashup', component: CashupComponent },
        ]
     },

     { path: 'calculator', component: CalculatorComponent },

     { path: 'histories', component: HistoryComponent },

     { path: 'withdrawal',
        children: [
          { path: '', component: WithdrawalComponent },
          { path: 'auto-withdraw', component: AutoWithdrawComponent }
        ]
     },

      { path: 'settings',
          children: [
            { path: '', component: ProfileSettingComponent },
            { path: 'profile', component: ProfileSettingComponent },
            { path: 'security', component: SecuritySettingComponent },
          ]
      },

      { path: 'wagers', 
        children: [
          { path: '', component: WagerComponent},
          { path: 'about', component: WagerInfoComponent},
          { path: 'histories', component: WagerHistoriesComponent},
        ]
      },

     { path: 'deposit', component: DepositComponent,
      children: [
        { path: '', component: CardComponent },
        { path: 'card', component: CardComponent },
        { path: 'bank', component: BankComponent }
      ]
     },
     
     { path: 'feedback', loadChildren: () => import('./feedback/feedback-routes').then(r => r.FeedbackRouting) },

     { path: 'copybet',
        children: [
          { path: '', component: CopybetComponent },
        ]
     },

    /*  { path: 'admin',
        children: [
          { path: '', component: AdministratorComponent,
            children: [
              { path: 'users', component: UsersComponent },
              { path: 'wagers', 
                children: [
                  {path: '', redirectTo: 'upload', pathMatch: 'full' },
                  {path: 'upload', component: WagersUploadComponent },
                  {path: 'update', component: WagersUpdateComponent },
                ]
              },
              { path: 'financials', 
                children: [
                  {path: '', redirectTo: 'deposit-mgt', pathMatch: 'full' },
                  {path: 'deposit-mgt', component: DepositMgtComponent },
                  {path: 'withdraw-mgt', component: WithdrawMgtComponent },
                  {path: 'loan-mgt', component: LoanMgtComponent },
                ]
              },
            ] 
          }
        ]
     }, */
    ]
  },
]
