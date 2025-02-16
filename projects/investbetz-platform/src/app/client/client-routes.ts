import { Routes } from "@angular/router";
import { DashboardComponent } from './dashboard.component';
import { IndexComponent } from './index/index.component';
import { CalculatorComponent } from './calculator/calculator.component';

import { authGuard } from "../auth/guard.service";


export const DashboardRouting: Routes = [
  { path: '', component: DashboardComponent, 
    canActivate: [authGuard],
    children: [
    { path: '', component: IndexComponent },
    { path: 'investments', loadChildren: () => import('./investmnt/investmnt-routes').then(r => r.PlanRouting) },
    { path: 'calculator', component: CalculatorComponent },
    { path: 'settings', loadChildren: () => import('./settings/settings-routes').then(r => r.SettingsRouting) },
    { path: 'transactions', loadChildren: () => import('./transactions/transaction-routes').then(r => r.TransactionRouting) },
    ]
  },
]
