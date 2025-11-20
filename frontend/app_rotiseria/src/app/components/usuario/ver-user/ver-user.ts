import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuarios } from '../../../services/usuarios';
import { CommonModule } from '@angular/common';
import { PaginationService } from '../../../services/pagination.service';

@Component({
  selector: 'app-ver-user',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './ver-user.html',
  styleUrls: ['./ver-user.css']
})
export class VerUser {
  nombre: string = '';
  criterioBusqueda: string = 'dni';
  arrayUsuarios: any[] = [];

  constructor(
    private router: Router,
    private usuarioSvc: Usuarios,
    public paginationSvc: PaginationService
  ) {}

  ngOnInit() {
    this.paginationSvc.setPage(1);
    this.cargarUsuarios();
  }

  cargarUsuarios() {
  this.usuarioSvc.getUsuarios(this.paginationSvc.page, this.paginationSvc.itemsPerPage, this.nombre, this.criterioBusqueda).subscribe({
    next: (res: any) => {
      console.log("Usuarios recibidos: ", res);
      console.log("Total de usuarios: ", res.total); // Verificar el total
      this.arrayUsuarios = res.usuarios; 
      this.paginationSvc.totalItems = Number(res.total); // Asegurarse de que sea un número
    },
    error: (err) => {
      console.error("Error al traer usuarios: ", err);
    }
  });
}

  buscar() {
    this.paginationSvc.setPage(1); 
    this.cargarUsuarios();
  }

  onPageChange(page: number, event: Event) {
    event.preventDefault();
    console.log('Pagina cambiada a:', page); 
    this.paginationSvc.setPage(page);
    this.cargarUsuarios();
  }

  getPages(): number[] {
    const totalPages = this.paginationSvc.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  trackById(item: any) {
    return item.id;
  }

  editarUsuario(usuario: any) {
    this.router.navigateByUrl(`/usuario/${usuario.id}/Editar`);
  }

  crearUsuario() {
    this.router.navigateByUrl(`/usuario/null/Crear`);
  }

  eliminarUsuario(usuario: any) {
    this.router.navigateByUrl(`/usuario/${usuario.id}/Eliminar`);
  }
}