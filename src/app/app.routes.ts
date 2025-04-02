import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/policies/policy-list/policy-list.component').then((m) => m.PolicyListComponent)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
