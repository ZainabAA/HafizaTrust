import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/main/main.component').then(c => c.MainComponent)
    },
    {
        path: 'user',
        children: [
            {
                path: 'home',
                loadComponent: () => import('./pages/user-home/user-home.component').then(c => c.UserHomeComponent)
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./pages/main/main.component').then(c => c.MainComponent)
    }
];
