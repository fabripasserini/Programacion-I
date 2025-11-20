import { Routes,RouteReuseStrategy } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginPage } from './pages/login-page/login-page';
import { Register } from './pages/register/register';
import { Usuarios } from './pages/usuarios/usuarios';
import { Menu } from './pages/menu/menu';
import { ErrorPage } from './pages/error-page/error-page';
import { CarritoPage } from './pages/carrito/carrito';
import { Favoritos } from './pages/favoritos/favoritos';
import { Dejarresena } from './pages/dejarresena/dejarresena';
import { Ordencancelada } from './pages/ordencancelada/ordencancelada';
import { Pedidovacio } from './pages/pedidovacio/pedidovacio';
import { Inicio } from './pages/inicio/inicio';
import { Notificaciones } from './pages/notificaciones/notificaciones';
import { ModificarPedidos } from './pages/modificar-pedidos/modificar-pedidos';
import { PedidosClientes } from './pages/pedidos-clientes/pedidos-clientes';
import { Productos } from './pages/productos/productos';
import { EstadoPedidos } from './pages/estado-pedidos/estado-pedidos';
import { AgregarPedido } from './pages/agregar-pedido/agregar-pedido';
import { VerificarStock } from './pages/verificar-stock/verificar-stock';
import { Contacto } from './pages/contacto/contacto';
import { authsessionGuard } from './guards/authsession-guard';
import { authuserGuard } from './guards/authuser-guard';
import { authadminGuard } from './guards/authadmin-guard';
import { authempleadoGuard } from './guards/authempleado-guard';
import { authadminempleadoGuard } from './guards/authadminempleado-guard';
import { Pedido } from './pages/pedido/pedido';
import { Pedidos } from './pages/pedidos/pedidos';
import { Perfil } from './components/perfil/perfil';
import { Calificaciones } from './pages/calificaciones/calificaciones';
export const routes: Routes = [
    { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
    { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register) },
    { path: 'login', loadComponent: () => import('./pages/login-page/login-page').then(m => m.LoginPage) },
    { path: 'usuarios', loadComponent: () => import('./pages/usuarios/usuarios').then(m => m.Usuarios),canActivate:[authadminempleadoGuard] },
    // { path: 'menu', loadComponent: () => import('./pages/menu/menu').then(m => m.Menu),canActivate:[authuserGuard] },
    // { path: 'administrar-user', loadComponent: () => import('./pages/administrar-user/administrar-user').then(m => m.AdministrarUser),canActivate:[authempleadoGuard] },
    // { path: 'enviar-ofertas', loadComponent: () => import('./pages/enviar-ofertas/enviar-ofertas').then(m => m.EnviarOfertas),canActivate:[authadminGuard] },
    { path: 'menu', loadComponent: () => import('./pages/menu/menu').then(m => m.Menu) },
    { path: 'notificaciones', loadComponent: () => import('./pages/notificaciones/notificaciones').then(m => m.Notificaciones)},
    { path: 'calificaciones', loadComponent: () => import('./pages/calificaciones/calificaciones').then(m => m.Calificaciones) },
    { path: 'carrito', loadComponent: () => import('./pages/carrito/carrito').then(m => m.CarritoPage) },
    { path: 'favoritos', loadComponent: () => import('./pages/favoritos/favoritos').then(m => m.Favoritos),canActivate:[authuserGuard] },
    { path: 'pedidos', loadComponent: () => import('./pages/pedidos/pedidos').then(m => m.Pedidos) },
    { path: 'dejarresena', loadComponent: () => import('./pages/dejarresena/dejarresena').then(m => m.Dejarresena) },
    { path: 'ordencancelada', loadComponent: () => import('./pages/ordencancelada/ordencancelada').then(m => m.Ordencancelada) },
    { path: 'pedidovacio', loadComponent: () => import('./pages/pedidovacio/pedidovacio').then(m => m.Pedidovacio) },
    { path: 'inicio', loadComponent: () => import('./pages/inicio/inicio').then(m => m.Inicio),canActivate:[authadminempleadoGuard] },

    { path: 'productos', loadComponent: () => import('./pages/productos/productos').then(m => m.Productos),runGuardsAndResolvers: 'always' },
    { path: 'estado-pedidos', loadComponent: () => import('./pages/estado-pedidos/estado-pedidos').then(m => m.EstadoPedidos) },
    { path: 'agregar-pedido', loadComponent: () => import('./pages/agregar-pedido/agregar-pedido').then(m => m.AgregarPedido) },
    { path: 'verificar-stock', loadComponent: () => import('./pages/verificar-stock/verificar-stock').then(m => m.VerificarStock) },
    { path: 'contacto', loadComponent: () => import('./pages/contacto/contacto').then(m => m.Contacto) },
    { path: 'error', loadComponent: () => import('./pages/error-page/error-page').then(m => m.ErrorPage) },
    { path: 'usuario/:id/:tipo_op', loadComponent: () => import('./pages/usuario/usuario').then(m => m.UsuarioComponent) },
    { path: 'producto/:id/:tipo_op', loadComponent: () => import('./pages/producto/producto').then(m => m.ProductoComponent) },
    { path: 'pedido/crear', loadComponent: () => import('./pages/pedido/pedido').then(m => m.Pedido) },
    { path: 'perfil', loadComponent: () => import('./components/perfil/perfil').then(m => m.Perfil) },
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