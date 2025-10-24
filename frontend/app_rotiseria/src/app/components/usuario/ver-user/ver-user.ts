import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuarios } from '../../../services/usuarios';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-ver-user',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgxPaginationModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './ver-user.html',
  styleUrls: ['./ver-user.css']
})
export class VerUser {
  nombre: string = '';
  page: number = 1;
  itemsPerPage: number = 5;
  totalUsuarios: number = 0;
  arrayUsuarios: any[] = [];

  constructor(
    private router: Router,
    private usuarioSvc: Usuarios
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioSvc.getUsuarios(this.page, this.itemsPerPage, this.nombre).subscribe({
      next: (res: any) => {
        console.log("Usuarios recibidos: ", res);
        this.arrayUsuarios = res.usuarios; 
        this.totalUsuarios = Number(res.total);
      },
      error: (err) => {
        console.error("Error al traer usuarios: ", err);
      }
    });
  }

  onPageChange(page: number) {
    console.log('Page changed to:', page);
    this.page = page; 
    this.cargarUsuarios();
  }

  buscar() {
    this.page = 1; 
    this.cargarUsuarios();
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
    this.router.navigateByUrl(`/usuarios/`);
  }
}
