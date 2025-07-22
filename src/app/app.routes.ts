import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard.ts';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
    { path: '', component: Login }, 
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard] }
];