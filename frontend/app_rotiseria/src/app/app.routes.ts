import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginPage } from './pages/login-page/login-page';
import { Register } from './pages/register/register';
import { Usuarios } from './pages/usuarios/usuarios';
import { Menu } from './pages/menu/menu';
import { ErrorPage } from './pages/error-page/error-page';

import { Carrito } from './pages/carrito/carrito';
import { Favoritos } from './pages/favoritos/favoritos';
import { Pedidos } from './pages/pedidos/pedidos';
import { Carritoconproductos } from './pages/carritoconproductos/carritoconproductos';
import { Dejarresena } from './pages/dejarresena/dejarresena';
import { Ordencancelada } from './pages/ordencancelada/ordencancelada';
import { Pedidoscancelados } from './pages/pedidoscancelados/pedidoscancelados';
import { Pedidoscompletados } from './pages/pedidoscompletados/pedidoscompletados';
import { Pedidovacio } from './pages/pedidovacio/pedidovacio';
import { Inicio } from './pages/inicio/inicio';
import { EliminarProductos } from './pages/eliminar-productos/eliminar-productos';
import { EnviarOfertas } from './pages/enviar-ofertas/enviar-ofertas';
import { AgregarProductos } from './pages/agregar-productos/agregar-productos';
import { ModificarPedidos } from './pages/modificar-pedidos/modificar-pedidos';
import { ModificarProductos } from './pages/modificar-productos/modificar-productos';
import { PedidosClientes } from './pages/pedidos-clientes/pedidos-clientes';
import { Productos } from './pages/productos/productos';
import { AdministrarUser } from './pages/administrar-user/administrar-user';
import { EstadoPedidos } from './pages/estado-pedidos/estado-pedidos';
import { AgregarPedido } from './pages/agregar-pedido/agregar-pedido';
import { VerificarStock } from './pages/verificar-stock/verificar-stock';
import { Contacto } from './pages/contacto/contacto';
import { authsessionGuard } from './guards/authsession-guard';
import { authuserGuard } from './guards/authuser-guard';
import { authadminGuard } from './guards/authadmin-guard';
import { authempleadoGuard } from './guards/authempleado-guard';

export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
    { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register) },
    { path: 'login', loadComponent: () => import('./pages/login-page/login-page').then(m => m.LoginPage) },
    { path: 'usuarios', loadComponent: () => import('./pages/usuarios/usuarios').then(m => m.Usuarios) },
    // { path: 'menu', loadComponent: () => import('./pages/menu/menu').then(m => m.Menu),canActivate:[authuserGuard] },
    // { path: 'administrar-user', loadComponent: () => import('./pages/administrar-user/administrar-user').then(m => m.AdministrarUser),canActivate:[authempleadoGuard] },
    // { path: 'enviar-ofertas', loadComponent: () => import('./pages/enviar-ofertas/enviar-ofertas').then(m => m.EnviarOfertas),canActivate:[authadminGuard] },
    { path: 'menu', loadComponent: () => import('./pages/menu/menu').then(m => m.Menu) },
    { path: 'administrar-user', loadComponent: () => import('./pages/administrar-user/administrar-user').then(m => m.AdministrarUser) },
    { path: 'enviar-ofertas', loadComponent: () => import('./pages/enviar-ofertas/enviar-ofertas').then(m => m.EnviarOfertas) },
  
    { path: 'carrito', loadComponent: () => import('./pages/carrito/carrito').then(m => m.Carrito) },
    { path: 'favoritos', loadComponent: () => import('./pages/favoritos/favoritos').then(m => m.Favoritos) },
    { path: 'pedidos', loadComponent: () => import('./pages/pedidos/pedidos').then(m => m.Pedidos) },
    { path: 'carritoconproductos', loadComponent: () => import('./pages/carritoconproductos/carritoconproductos').then(m => m.Carritoconproductos) },
    { path: 'dejarresena', loadComponent: () => import('./pages/dejarresena/dejarresena').then(m => m.Dejarresena) },
    { path: 'ordencancelada', loadComponent: () => import('./pages/ordencancelada/ordencancelada').then(m => m.Ordencancelada) },
    { path: 'pedidoscancelados', loadComponent: () => import('./pages/pedidoscancelados/pedidoscancelados').then(m => m.Pedidoscancelados) },
    { path: 'pedidoscompletados', loadComponent: () => import('./pages/pedidoscompletados/pedidoscompletados').then(m => m.Pedidoscompletados) },
    { path: 'pedidovacio', loadComponent: () => import('./pages/pedidovacio/pedidovacio').then(m => m.Pedidovacio) },
    { path: 'inicio', loadComponent: () => import('./pages/inicio/inicio').then(m => m.Inicio) },
    { path: 'eliminar-productos', loadComponent: () => import('./pages/eliminar-productos/eliminar-productos').then(m => m.EliminarProductos) },
    { path: 'agregar-productos', loadComponent: () => import('./pages/agregar-productos/agregar-productos').then(m => m.AgregarProductos) },
    { path: 'modificar-pedidos', loadComponent: () => import('./pages/modificar-pedidos/modificar-pedidos').then(m => m.ModificarPedidos) },
    { path: 'modificar-productos', loadComponent: () => import('./pages/modificar-productos/modificar-productos').then(m => m.ModificarProductos) },
    { path: 'pedidos-clientes', loadComponent: () => import('./pages/pedidos-clientes/pedidos-clientes').then(m => m.PedidosClientes) },
    { path: 'productos', loadComponent: () => import('./pages/productos/productos').then(m => m.Productos) },
    { path: 'estado-pedidos', loadComponent: () => import('./pages/estado-pedidos/estado-pedidos').then(m => m.EstadoPedidos) },
    { path: 'agregar-pedido', loadComponent: () => import('./pages/agregar-pedido/agregar-pedido').then(m => m.AgregarPedido) },
    { path: 'verificar-stock', loadComponent: () => import('./pages/verificar-stock/verificar-stock').then(m => m.VerificarStock) },
    { path: 'contacto', loadComponent: () => import('./pages/contacto/contacto').then(m => m.Contacto) },
    { path: 'error', loadComponent: () => import('./pages/error-page/error-page').then(m => m.ErrorPage) },
    { path: 'usuario/:id/:tipo_op', loadComponent: () => import('./pages/usuario/usuario').then(m => m.UsuarioComponent) },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'error', pathMatch: 'full' }
];