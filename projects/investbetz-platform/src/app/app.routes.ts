import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./index/index-routes').then(r => r.IndexRouting) },
    { path: 'dashboard', loadChildren: () => import('./client/client-routes').then(r => r.DashboardRouting)
  },
];
