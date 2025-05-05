import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/main/main.component').then(c => c.MainComponent)
    },
    { 
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login.component').then(c => c.LoginComponent)
    },
    { 
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register.component').then(c => c.RegisterComponent)
    },
    // { path: 'notes', component: NotesComponent },
    // { path: 'notes/:id', component: NoteDetailsComponent },
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
