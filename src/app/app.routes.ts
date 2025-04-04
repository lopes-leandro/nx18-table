import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/policies/policy-list/policy-list.component').then((m) => m.PolicyListComponent)
    },
    {
        path: 'insurance-list',
        loadComponent: () => import('./pages/quotes/insurance-list/insurance-list.component').then((m) => m.InsuranceListComponent)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
