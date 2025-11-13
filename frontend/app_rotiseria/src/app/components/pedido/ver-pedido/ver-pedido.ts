import { Back } from '../../back/back';
import { Titulos } from '../../titulos/titulos';
import { Estadopedido } from '../../estadopedido/estadopedido';
import { Productoorden } from '../../productoorden/productoorden';
import { Boton } from '../../boton/boton';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Pedidos} from '../../../services/pedidos';
import { CommonModule } from '@angular/common';
import { PaginationService } from '../../../services/pagination.service';
import { ListaPedidos } from '../../lista-pedidos/lista-pedidos';
@Component({
  selector: 'app-ver-pedido',
  imports: [RouterLink, FormsModule, CommonModule, Back, Titulos, Estadopedido, Productoorden, Boton, ListaPedidos],
  templateUrl: './ver-pedido.html',
  styleUrl: './ver-pedido.css'
})
export class VerPedido {
  nombre: string = '';
    criterioBusqueda: string = 'dni';
    arrayPedidos: any[] = [];
  
    constructor(
      private router: Router,
      private pedidoSvc: Pedidos,
      public paginationSvc: PaginationService
    ) {}
  
    ngOnInit() {
      this.paginationSvc.setPage(1);
      this.cargarPedidos();
    }
  
    cargarPedidos() {
    this.pedidoSvc.getPedidos(this.paginationSvc.page, this.paginationSvc.itemsPerPage, this.nombre, this.criterioBusqueda).subscribe({
      next: (res: any) => {
        console.log("Pedidos recibidos: ", res);
        console.log("Total de Pedidos: ", res.total); // Verificar el total
        this.arrayPedidos = res.pedidos; 
        this.paginationSvc.totalItems = Number(res.total); // Asegurarse de que sea un número
      },
      error: (err) => {
        console.error("Error al traer Pedidos: ", err);
      }
    });
  }
  
    buscar() {
      this.paginationSvc.setPage(1); 
      this.cargarPedidos();
    }
  
    onPageChange(page: number, event: Event) {
      event.preventDefault();
      console.log('Pagina cambiada a:', page); 
      this.paginationSvc.setPage(page);
      this.cargarPedidos();
    }
  
    getPages(): number[] {
      const totalPages = this.paginationSvc.getTotalPages();
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    getPedidosPorEstado(estado: string): any[] {
      return this.arrayPedidos.filter(
        (pedido) => pedido.estado?.toLowerCase() === estado.toLowerCase()
      );
    }
    // aca van gets para que los tome como propiedades y no como metodos
    get pedidosEnProceso() {
      return this.getPedidosPorEstado('proceso');
    }

    get pedidosCompletados() {
      return this.getPedidosPorEstado('completado');
    }

    get pedidosCancelados() {
      return this.getPedidosPorEstado('cancelado');
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
  }