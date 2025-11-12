import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Productos } from '../../../services/productos';
import { CommonModule } from '@angular/common';
import { PaginationService } from '../../../services/pagination.service';

@Component({
  selector: 'app-ver-producto',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  templateUrl: './ver-producto.html',
  styleUrl: './ver-producto.css'
})
export class VerProducto {
  nombre!: string;
  descripcion!: string;
  criterioBusqueda: string = 'nombre'; // Criterio de búsqueda por defecto
  arrayProductos: any[] = [];
  constructor(
    private router:Router,
    private productoSvc: Productos,
    public paginationSvc: PaginationService
  ){}

  ngOnInit(){
    this.paginationSvc.setPage(1);
    this.cargarProductos();
  }

  cargarProductos() {
  this.productoSvc.getProductos(this.paginationSvc.page, this.paginationSvc.itemsPerPage, this.nombre, this.criterioBusqueda).subscribe({
    next: (res: any) => {
      console.log("Productos recibidos: ", res);
      this.arrayProductos = res.productos; 
      this.paginationSvc.totalItems = Number(res.total);
    },
    error: (err) => {
      console.error("Error al traer productos: ", err);
    }
  });
}

  buscar() {
    this.paginationSvc.setPage(1); 
    this.cargarProductos();
  }
  onPageChange(page: number, event: Event) {
    event.preventDefault();
    console.log('Página cambiada a:', page); // Log para verificar el cambio de página
    this.paginationSvc.setPage(page);
    this.cargarProductos();
  }
   getPages(): number[] {
    const totalPages = this.paginationSvc.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
   trackById(item: any) {
    return item.id;
  }
  editarProducto(producto:any){
    // this.router.navigate([`/usuario/${usuario.id}/Editar`]);
    this.router.navigateByUrl(`/producto/${producto.id}/Editar`);
  }
  crearProducto(){
    this.router.navigateByUrl(`/producto/null/Crear`);
  }
  eliminarUsuario(producto:any){ // id
    this.router.navigateByUrl(`/productos/`);
  }



//   buscar(){
//   const nombreNuevo = (this.nombre || '').toLowerCase().trim();
//   this.arrayFiltred = this.arrayProductos.filter(p =>
//     (p.nombre || '').toLowerCase().includes(nombreNuevo)
//   );
// }

}
