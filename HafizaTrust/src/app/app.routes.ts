import { Routes } from '@angular/router';
import { roleGuard } from './guards/role.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'main',
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
    {
        path: 'user',
        loadComponent: () => import('./pages/user-home/user-home.component').then(c => c.UserHomeComponent),
        canActivate:[authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/user/home/home.component').then(c => c.HomeComponent),
            },
            {
                path: 'transactions',
                loadComponent: () => import('./pages/user/transactions-list/transactions-list.component').then(c => c.TransactionsListComponent)
            },
            {
                path: 'beneficiaries',
                loadComponent: () => import('./pages/user/beneficiaries/beneficiaries.component').then(c => c.BeneficiariesComponent)
            },
            {
                path: 'profile',
                loadComponent: () => import('./pages/user/profile/profile.component').then(c => c.ProfileComponent)
            },
            {
                path: 'services',
                loadComponent: () => import('./pages/user/services/services/services.component').then(c => c.ServicesComponent)
            },
            {
                path: '**',
                loadComponent: () => import('./pages/user/home/home.component').then(c => c.HomeComponent),
            },
        ]
    },
    {
        path: 'admin',
        canActivate:[authGuard,roleGuard],
        loadComponent: () => import('./pages/admin/admin.component').then(c => c.AdminComponent)
    },
    {
        path: '**',
        loadComponent: () => import('./pages/user-home/user-home.component').then(c => c.UserHomeComponent),
        canActivate:[authGuard],
    }
];
