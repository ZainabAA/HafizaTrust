import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/main/main.component').then(c => c.MainComponent)
    },
    {
        path: 'user',
        loadComponent: () => import('./pages/user-home/user-home.component').then(c => c.UserHomeComponent),
        children: [
            {
                path: 'cards',
                loadComponent: () => import('./pages/user/cards-list/cards-list.component').then(c => c.CardsListComponent),
            },
            {
                path: 'transactions',
                loadComponent: () => import('./pages/user/transactions-list/transactions-list.component').then(c => c.TransactionsListComponent)
            },
            // {
            //     path: 'beneficiaries',
            //     loadChildren: () => import('./pages/user-home/user-home.component').then(c => c.UserHomeComponent)
            // },
            // {
            //     path: 'profile',
            //     loadChildren: () => import('./pages/user-home/user-home.component').then(c => c.UserHomeComponent)
            // },
            {
                path: 'services',
                loadComponent: () => import('./pages/user/services/services/services.component').then(c => c.ServicesComponent)
            },
            // {
            //     path: '**',
            //     loadChildren: () => import('./pages/user/cards-list/cards-list.component').then(c => c.CardsListComponent)
            // },
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./pages/main/main.component').then(c => c.MainComponent)
    }
];
