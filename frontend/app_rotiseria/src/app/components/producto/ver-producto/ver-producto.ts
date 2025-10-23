import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Productos } from '../../../services/productos';

@Component({
  selector: 'app-ver-producto',
  imports: [RouterLink, FormsModule],
  templateUrl: './ver-producto.html',
  styleUrl: './ver-producto.css'
})
export class VerProducto {
  nombre!: string;
  descripcion!: string;

  arrayProductos: any[] = [];
  arrayFiltred: any[] = [];
  constructor(
    private router:Router,
    private productoSvc: Productos
  ){}

  ngOnInit(){
    this.productoSvc.getProductos().subscribe({
      next: (res:any) => {
        console.log("Usuarios: ", res);
        this.arrayProductos = res.productos;
        this.arrayFiltred = [...this.arrayProductos]
      },
      error: (err) => {
        console.log("Error al traer usuarios: ", err);
      }
    })
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
  buscar(){
  const nombreNuevo = (this.nombre || '').toLowerCase().trim();
  this.arrayFiltred = this.arrayProductos.filter(p =>
    (p.nombre || '').toLowerCase().includes(nombreNuevo)
  );
}

}
