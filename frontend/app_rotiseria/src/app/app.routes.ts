import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginPage } from './pages/login-page/login-page';
import { Register } from './pages/register/register';

import { ErrorPage } from './pages/error-page/error-page';
export const routes: Routes = [
    {path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home)},
    {path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register)},
    {path: 'login', loadComponent: () => import('./pages/login-page/login-page').then(m => m.LoginPage)},
    {path: 'usuarios', loadComponent: () => import('./pages/usuarios/usuarios').then(m => m.Usuarios)},
    {path: 'error', component: ErrorPage},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'error', pathMatch: 'full'},

];