import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginPage } from './pages/login-page/login-page';
import { Register } from './pages/register/register';
import { InicioAdmin } from './pages/inicio-admin/inicio-admin';
import { ErrorPage } from './pages/error-page/error-page';
import { EliminarProductos } from './pages/eliminar-productos/eliminar-productos';
import { Usuarios } from './pages/usuarios/usuarios';
import { EnviarOfertas } from './pages/enviar-ofertas/enviar-ofertas';
import { AgregarProductos } from './pages/agregar-productos/agregar-productos';
import { ModificarPedidos } from './pages/modificar-pedidos/modificar-pedidos';
import { ModificarProductos } from './pages/modificar-productos/modificar-productos';
import { PedidosClientes } from './pages/pedidos-clientes/pedidos-clientes';
import { Productos } from './pages/productos/productos';
import { AdministrarUser } from './pages/administrar-user/administrar-user';
import { InicioEmpleado } from './pages/inicio-empleado/inicio-empleado';
import { EstadoPedidos } from './pages/estado-pedidos/estado-pedidos';
import { AgregarPedido } from './pages/agregar-pedido/agregar-pedido';
import { VerificarStock } from './pages/verificar-stock/verificar-stock';
import { Contacto } from './pages/contacto/contacto';
export const routes: Routes = [
    { path: 'error', loadComponent: () => import('./pages/error-page/error-page').then(m => m.ErrorPage) },

    {path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home)},
    {path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register)},
    {path: 'login', loadComponent: () => import('./pages/login-page/login-page').then(m => m.LoginPage)},
    {path: 'usuarios', loadComponent: () => import('./pages/usuarios/usuarios').then(m => m.Usuarios)},
    {path: 'inicio-admin', loadComponent: () => import('./pages/inicio-admin/inicio-admin').then(m => m.InicioAdmin)},
    {path: 'eliminar-productos', loadComponent: () => import('./pages/eliminar-productos/eliminar-productos').then(m => m.EliminarProductos)},
    {path: 'enviar-ofertas', loadComponent: () => import('./pages/enviar-ofertas/enviar-ofertas').then(m => m.EnviarOfertas)},
    {path: 'agregar-productos', loadComponent: () => import('./pages/agregar-productos/agregar-productos').then(m => m.AgregarProductos)},
    {path: 'modificar-pedidos', loadComponent: () => import('./pages/modificar-pedidos/modificar-pedidos').then(m => m.ModificarPedidos)},
    {path: 'modificar-productos', loadComponent: () => import('./pages/modificar-productos/modificar-productos').then(m => m.ModificarProductos)},
    {path: 'pedidos-clientes', loadComponent: () => import('./pages/pedidos-clientes/pedidos-clientes').then(m => m.PedidosClientes)},
    {path: 'productos', loadComponent: () => import('./pages/productos/productos').then(m => m.Productos)},
    {path: 'administrar-user', loadComponent: () => import('./pages/administrar-user/administrar-user').then(m => m.AdministrarUser)},
    {path: 'inicio-empleado', loadComponent: () => import('./pages/inicio-empleado/inicio-empleado').then(m => m.InicioEmpleado)},
    {path: 'estado-pedidos', loadComponent: () => import('./pages/estado-pedidos/estado-pedidos').then(m => m.EstadoPedidos)},
    {path: 'agregar-pedido', loadComponent: () => import('./pages/agregar-pedido/agregar-pedido').then(m => m.AgregarPedido)},
    {path: 'verificar-stock', loadComponent: () => import('./pages/verificar-stock/verificar-stock').then(m => m.VerificarStock)},
    {path: 'eliminar-productos', loadComponent: () => import('./pages/eliminar-productos/eliminar-productos').then(m => m.EliminarProductos)},
    {path: 'contacto', loadComponent: () => import('./pages/contacto/contacto').then(m => m.Contacto)},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'error', pathMatch: 'full'}

];