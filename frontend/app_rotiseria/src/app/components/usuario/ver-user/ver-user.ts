import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuarios } from '../../../services/usuarios';

@Component({
  selector: 'app-ver-user',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './ver-user.html',
  styleUrl: './ver-user.css'
})
export class VerUser {

  nombre!: string;


  arrayUsuarios: any[] = [];
  arrayFiltred: any[] = [];
  constructor(
    private router:Router,
    private usuarioSvc: Usuarios
  ){}

  ngOnInit(){
    this.usuarioSvc.getUsuarios().subscribe({
      next: (res:any) => {
        console.log("Usuarios: ", res);
        this.arrayUsuarios = res.usuarios;
        this.arrayFiltred = [...this.arrayUsuarios]
      },
      error: (err) => {
        console.log("Error al traer usuarios: ", err);
      }
    })
  }

  editarUsuario(usuario:any){
    // this.router.navigate([`/usuario/${usuario.id}/Editar`]);
    this.router.navigateByUrl(`/usuario/${usuario.id}/Editar`);
  }
  crearUsuario(){
    this.router.navigateByUrl(`/usuario/null/Crear`);
  }
  eliminarUsuario(usuario:any){ // id
    this.router.navigateByUrl(`/usuarios/null/Eliminado`);
  }
  buscar(){
    let nombreNuevo = this.nombre.toLowerCase();
    this.arrayFiltred = this.arrayUsuarios.filter(u => u.name.toLowerCase().includes(nombreNuevo));
  }
}