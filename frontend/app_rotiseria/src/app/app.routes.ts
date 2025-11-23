import { Routes,RouteReuseStrategy } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginPage } from './pages/login-page/login-page';
import { Register } from './pages/register/register';
import { Usuarios } from './pages/usuarios/usuarios';
import { Menu } from './pages/menu/menu';
import { ErrorPage } from './pages/error-page/error-page';
import { CarritoPage } from './pages/carrito/carrito';
import { Inicio } from './pages/inicio/inicio';
import { Notificaciones } from './pages/notificaciones/notificaciones';
import { Productos } from './pages/productos/productos';
import { AgregarPedido } from './pages/agregar-pedido/agregar-pedido';
import { authsessionGuard } from './guards/authsession-guard';
import { authnotsessionGuard } from './guards/authnotsession-guard';
import { authadminempleadoGuard } from './guards/authadminempleado-guard';
import { Pedido } from './pages/pedido/pedido';
import { Pedidos } from './pages/pedidos/pedidos';
import { Perfil } from './components/perfil/perfil';
import { Calificaciones } from './pages/calificaciones/calificaciones';
export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
    { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register),canActivate:[authnotsessionGuard] },
    { path: 'login', loadComponent: () => import('./pages/login-page/login-page').then(m => m.LoginPage),canActivate:[authnotsessionGuard] },
    { path: 'usuarios', loadComponent: () => import('./pages/usuarios/usuarios').then(m => m.Usuarios),canActivate:[authadminempleadoGuard] },
    // { path: 'menu', loadComponent: () => import('./pages/menu/menu').then(m => m.Menu),canActivate:[authuserGuard] },
    // { path: 'administrar-user', loadComponent: () => import('./pages/administrar-user/administrar-user').then(m => m.AdministrarUser),canActivate:[authempleadoGuard] },
    // { path: 'enviar-ofertas', loadComponent: () => import('./pages/enviar-ofertas/enviar-ofertas').then(m => m.EnviarOfertas),canActivate:[authadminGuard] },
    { path: 'menu', loadComponent: () => import('./pages/menu/menu').then(m => m.Menu) },
    { path: 'notificaciones', loadComponent: () => import('./pages/notificaciones/notificaciones').then(m => m.Notificaciones),canActivate:[authsessionGuard] },
    { path: 'calificaciones', loadComponent: () => import('./pages/calificaciones/calificaciones').then(m => m.Calificaciones),canActivate:[authsessionGuard] },
    { path: 'carrito', loadComponent: () => import('./pages/carrito/carrito').then(m => m.CarritoPage),canActivate:[authsessionGuard] },
    { path: 'pedidos', loadComponent: () => import('./pages/pedidos/pedidos').then(m => m.Pedidos),canActivate:[authsessionGuard] },
    { path: 'inicio', loadComponent: () => import('./pages/inicio/inicio').then(m => m.Inicio),canActivate:[authadminempleadoGuard], },

    { path: 'productos', loadComponent: () => import('./pages/productos/productos').then(m => m.Productos),runGuardsAndResolvers: 'always' },
    { path: 'contacto', loadComponent: () => import('./pages/contacto/contacto').then(m => m.Contacto) },
    { path: 'error', loadComponent: () => import('./pages/error-page/error-page').then(m => m.ErrorPage) },
    { path: 'usuario/:id/:tipo_op', loadComponent: () => import('./pages/usuario/usuario').then(m => m.UsuarioComponent),canActivate:[authadminempleadoGuard] },
    { path: 'producto/:id/:tipo_op', loadComponent: () => import('./pages/producto/producto').then(m => m.ProductoComponent),canActivate:[authadminempleadoGuard] },
    { path: 'pedido/crear', loadComponent: () => import('./pages/pedido/pedido').then(m => m.Pedido),canActivate:[authsessionGuard] },
    { path: 'perfil', loadComponent: () => import('./components/perfil/perfil').then(m => m.Perfil),canActivate:[authsessionGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

class NoReuseStrategy implements RouteReuseStrategy {
  shouldDetach() { return false; }
  store() {}
  shouldAttach() { return false; }
  retrieve() { return null; }
  shouldReuseRoute() { return false; }
}

// Exportar providers
export const routeProviders = [
  { provide: RouteReuseStrategy, useClass: NoReuseStrategy }
];