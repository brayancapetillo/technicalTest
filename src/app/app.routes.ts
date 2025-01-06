import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'multiples-number',
    pathMatch: 'full',
  },
  {
    path: 'multiples-number',
    loadComponent: () => import('./pages/multiples-number/multiples-number.page').then( m => m.MultiplesNumberPage)
  },
];
