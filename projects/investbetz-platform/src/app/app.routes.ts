import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./index/index-routes').then(r => r.IndexRouting) },
];
