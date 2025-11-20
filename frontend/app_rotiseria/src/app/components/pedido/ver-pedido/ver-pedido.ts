import { Back } from '../../back/back';
import { Titulos } from '../../titulos/titulos';
import { Estadopedido } from '../../estadopedido/estadopedido';
import { Boton } from '../../boton/boton';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Pedidos} from '../../../services/pedidos';
import { CommonModule } from '@angular/common';
import { PaginationService } from '../../../services/pagination.service';
import { ListaPedidos } from '../../lista-pedidos/lista-pedidos';
import { GetUserInfo } from '../../../services/getuserinfo';
@Component({
  selector: 'app-ver-pedido',
  imports: [RouterLink, FormsModule, CommonModule, Back, Titulos, Estadopedido, Boton, ListaPedidos],
  templateUrl: './ver-pedido.html',
  styleUrl: './ver-pedido.css'
})
export class VerPedido {
  nombre: string = '';
  userId: number | null = null;
  criterioBusqueda: string = 'dni';
    pedidosEnProceso: any[] = [];
    pedidosCompletados: any[] = [];
    pedidosCancelados: any[] = [];
    activeTab: string = 'proceso'; // 'proceso', 'completado', 'cancelado'
    fechaInicio: string = '';
    fechaFin: string = '';
    constructor(
      private router: Router,
      private pedidoSvc: Pedidos,
      public paginationSvc: PaginationService,
      private userInfo: GetUserInfo
    ) {}
  
    ngOnInit() {
      this.paginationSvc.setPage(1);
      this.cargarPedidosPorEstado(this.activeTab);
    }
  
    cargarPedidosPorEstado(estado: string) {
        this.userId = this.userInfo.getId();

        let usuarioFiltro: number | undefined;     
        if (this.getRol()==='user' && this.userId) {
          usuarioFiltro = this.userId;
      }
      this.pedidoSvc.getPedidos(this.paginationSvc.page, this.paginationSvc.itemsPerPage, this.nombre, this.criterioBusqueda, estado, this.fechaInicio, this.fechaFin,usuarioFiltro!).subscribe({
        next: (res: any) => {
          console.log(`Pedidos ${estado} recibidos: `, res);
          if (estado === 'proceso') {
            this.pedidosEnProceso = res.pedidos;
          } else if (estado  === 'completado') {
            this.pedidosCompletados = res.pedidos;
          } else if (estado === 'cancelado') {
            this.pedidosCancelados = res.pedidos;
          }
          if (estado === this.activeTab) {
            this.paginationSvc.totalItems = Number(res.total);
          }
        },
        error: (err) => {
          console.error(`Error al traer Pedidos ${estado}: `, err);
        }
      });
    }

    onTabChange(estado: string) {
      this.activeTab = estado;
      this.paginationSvc.setPage(1); // Reset pagination when changing tabs
      this.cargarPedidosPorEstado(this.activeTab);
    }
  
    buscar() {
      this.paginationSvc.setPage(1); 
      this.cargarPedidosPorEstado(this.activeTab);
    }
  
    onPageChange(page: number, event: Event) {
      event.preventDefault();
      console.log('Pagina cambiada a:', page); 
      this.paginationSvc.setPage(page);
      this.cargarPedidosPorEstado(this.activeTab);
    }
  
    getPages(): number[] {
      const totalPages = this.paginationSvc.getTotalPages();
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  
    trackById(item: any) {
      return item.id;
    }
  
    editarPedido(pedido: any) {
      this.router.navigateByUrl(`/pedido/${pedido.id}/Editar`);
    }
  
    crearPedido() {
      this.router.navigateByUrl(`/pedido/null/Crear`);
    }
  
    eliminarPedido(pedido: any) {
      this.router.navigateByUrl(`/pedido/${pedido.id}/Eliminar`);
    }
    getRol() {
      return this.userInfo.getRol();
    }
    

  }