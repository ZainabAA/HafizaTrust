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
            // {
            //     path: 'transactions',
            //     loadChildren: () => import('./pages/user-home/user-home.component').then(c => c.UserHomeComponent)
            // },
            // {
            //     path: 'beneficiaries',
            //     loadChildren: () => import('./pages/user-home/user-home.component').then(c => c.UserHomeComponent)
            // },
            // {
            //     path: 'profile',
            //     loadChildren: () => import('./pages/user-home/user-home.component').then(c => c.UserHomeComponent)
            // },
            // {
            //     path: 'services',
            //     loadChildren: () => import('./pages/user-home/user-home.component').then(c => c.UserHomeComponent)
            // },
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
