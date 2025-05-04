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
            //     loadComponent: () => import('./pages/user-home/user-home.component').then(c => c.UserHomeComponent)
            // },
            // {
            //     path: 'beneficiaries',
            //     loadComponent: () => import('./pages/user-home/user-home.component').then(c => c.UserHomeComponent)
            // },
            {
                path: 'userProfile',
                loadComponent: () => import('./pages/user/user-profile/user-profile.component').then(c => c.UserProfileComponent),
            },
            // {
            //     path: 'services',
            //     loadComponent: () => import('./pages/user-home/user-home.component').then(c => c.UserHomeComponent)
            // },
            {
                path: '**',
                loadComponent: () => import('./pages/user/cards-list/cards-list.component').then(c => c.CardsListComponent)
            },
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./pages/main/main.component').then(c => c.MainComponent)
    }
];
