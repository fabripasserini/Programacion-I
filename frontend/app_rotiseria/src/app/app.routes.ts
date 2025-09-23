import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginPage } from './pages/login-page/login-page';
import { Register } from './pages/register/register';
import { Usuarios } from './pages/usuarios/usuarios';
import { Menu } from './pages/menu/menu';
import { ErrorPage } from './pages/error-page/error-page';
import { Panchos } from './pages/panchos/panchos';
import { Hamburguesas } from './pages/hamburguesas/hamburguesas';
import { Bebidas } from './pages/bebidas/bebidas';
import { Papas } from './pages/papas/papas';
import { Pizzas } from './pages/pizzas/pizzas';
import { Pollos } from './pages/pollos/pollos';
import { Carrito } from './pages/carrito/carrito';
import { Favoritos } from './pages/favoritos/favoritos';
import { Pedidos } from './pages/pedidos/pedidos';
import { Carritoconproductos } from './pages/carritoconproductos/carritoconproductos';
import { Dejarresena } from './pages/dejarresena/dejarresena';
import { Ordencancelada } from './pages/ordencancelada/ordencancelada';
import { Pedidoscancelados } from './pages/pedidoscancelados/pedidoscancelados';
import { Pedidoscompletados } from './pages/pedidoscompletados/pedidoscompletados';
import { Pedidovacio } from './pages/pedidovacio/pedidovacio';


export const routes: Routes = [
    {path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home)},
    {path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register)},
    {path: 'login', loadComponent: () => import('./pages/login-page/login-page').then(m => m.LoginPage)},
    {path: 'usuarios', loadComponent: () => import('./pages/usuarios/usuarios').then(m => m.Usuarios)},
    {path: 'menu', loadComponent: () => import('./pages/menu/menu').then(m => m.Menu)},
    {path: 'panchos', loadComponent: () => import('./pages/panchos/panchos').then(m => m.Panchos)},
    {path: 'hamburguesas', loadComponent: () => import('./pages/hamburguesas/hamburguesas').then(m => m.Hamburguesas)},
    {path: 'bebidas', loadComponent: () => import('./pages/bebidas/bebidas').then(m => m.Bebidas)},
    {path: 'papas', loadComponent: () => import('./pages/papas/papas').then(m => m.Papas)},
    {path: 'pizzas', loadComponent: () => import('./pages/pizzas/pizzas').then(m => m.Pizzas)},
    {path: 'pollos', loadComponent: () => import('./pages/pollos/pollos').then(m => m.Pollos)},
    {path: 'carrito', loadComponent: () => import('./pages/carrito/carrito').then(m => m.Carrito)},
    {path: 'favoritos', loadComponent: () => import('./pages/favoritos/favoritos').then(m => m.Favoritos)},
    {path: 'pedidos', loadComponent: () => import('./pages/pedidos/pedidos').then(m => m.Pedidos)},
    {path: 'carritoconproductos', loadComponent: () => import('./pages/carritoconproductos/carritoconproductos').then(m => m.Carritoconproductos)},
    {path: 'dejarresena', loadComponent: () => import('./pages/dejarresena/dejarresena').then(m => m.Dejarresena)},
    {path: 'ordencancelada', loadComponent: () => import('./pages/ordencancelada/ordencancelada').then(m => m.Ordencancelada)},
    {path: 'pedidoscancelados', loadComponent: () => import('./pages/pedidoscancelados/pedidoscancelados').then(m => m.Pedidoscancelados)},
    {path: 'pedidoscompletados', loadComponent: () => import('./pages/pedidoscompletados/pedidoscompletados').then(m => m.Pedidoscompletados)},
    {path: 'pedidovacio', loadComponent: () => import('./pages/pedidovacio/pedidovacio').then(m => m.Pedidovacio)},
    {path: 'error', component: ErrorPage},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'error', pathMatch: 'full'},

];