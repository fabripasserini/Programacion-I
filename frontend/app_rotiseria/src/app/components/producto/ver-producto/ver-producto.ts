import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Productos } from '../../../services/productos';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-ver-producto',
  standalone: true,
  imports: [RouterLink, FormsModule, NgxPaginationModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  templateUrl: './ver-producto.html',
  styleUrl: './ver-producto.css'
})
export class VerProducto {
  nombre!: string;
  descripcion!: string;
  criterioBusqueda: string = 'nombre'; // Criterio de búsqueda por defecto
  page: number = 1;
  itemsPerPage: number = 10;
  totalProductos: number = 0;
  arrayProductos: any[] = [];
  constructor(
    private router:Router,
    private productoSvc: Productos
  ){}

  ngOnInit(){
    this.cargarProductos();
  }

  cargarProductos() {
  this.productoSvc.getProductos(this.page, this.itemsPerPage, this.nombre, this.criterioBusqueda).subscribe({
    next: (res: any) => {
      console.log("Usuarios recibidos: ", res);
      console.log("Total de usuarios: ", res.total); // Verificar el total
      this.arrayProductos = res.productos; 
      this.totalProductos = Number(res.total); // Asegurarse de que sea un número
      console.log("Total de usuarios: ", res.total); // Verificar el total
    },
    error: (err) => {
      console.error("Error al traer usuarios: ", err);
    }
  });
}

  buscar() {
    this.page = 1; 
    this.cargarProductos();
  }
  onPageChange(page: number) {
    console.log('Página cambiada a:', page); // Log para verificar el cambio de página
    this.page = page;
    this.cargarProductos();
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
