import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Calificaciones as CalificacionesService } from '../../services/calificaciones';
import { Productos as ProductosService } from '../../services/productos';
import { Usuarios as UsuariosService } from '../../services/usuarios'; // 👈 Agregar servicio de usuarios
import { PaginationService } from '../../services/pagination.service';
import { GetUserInfo } from '../../services/getuserinfo';
import { Boton } from '../../components/boton/boton';

@Component({
  selector: 'app-calificaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, Boton],
  providers: [DatePipe],
  templateUrl: './calificaciones.html',
  styleUrls: ['./calificaciones.css']
})
export class Calificaciones implements OnInit {
  productoId: number | null = null;
  producto: any = null;
  arrayCalificaciones: any[] = [];
  comentario: string = '';
  estrellas: number = 5;
  estrellasHover: number = 0;
  usuariosMap: Map<number, any> = new Map(); // 👈 Mapa para almacenar datos de usuarios
  public modo: string = 'ver';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private calificacionesSvc: CalificacionesService,
    private productosSvc: ProductosService,
    private usuariosSvc: UsuariosService, // 👈 Inyectar servicio
    public paginationSvc: PaginationService,
    public userService: GetUserInfo
  ) {}

  ngOnInit() {
    this.paginationSvc.setPage(1);
    
    this.route.queryParams.subscribe(params => {
      console.log('QueryParams recibidos:', params);
      
      if (params['id_producto']) {
        this.productoId = Number(params['id_producto']);
        console.log('Producto ID cargado:', this.productoId);
        this.cargarProducto();
        this.cargarCalificaciones();
      } else {
        console.error('No se recibió id_producto en los query params');
      }
      if (params['modo']) {
        this.modo = params['modo'];
      }
    });
  }

  cargarProducto() {
    if (!this.productoId) return;

    this.productosSvc.getProducto(this.productoId).subscribe({
      next: (res: any) => {
        this.producto = res;
      },
      error: err => console.error("Error al cargar producto:", err)
    });
  }

  cargarCalificaciones() {
    if (!this.productoId) return;

    this.calificacionesSvc.getCalificaciones(
      this.paginationSvc.page,
      this.paginationSvc.itemsPerPage,
      this.productoId
    ).subscribe({
      next: (res: any) => {
        const calificaciones = res["calificaciones  "] || res.calificaciones || res;
        this.arrayCalificaciones = calificaciones || [];
        this.paginationSvc.totalItems = Number(res.total || this.arrayCalificaciones.length);
        
        // 👈 Cargar datos de usuarios después de obtener calificaciones
        this.cargarDatosUsuarios();
      },
      error: err => console.error("Error al traer calificaciones:", err)
    });
  }

  // 👈 NUEVO MÉTODO: Cargar datos de usuarios
  cargarDatosUsuarios() {
    const userIds = [...new Set(this.arrayCalificaciones.map(cal => cal.id_usuario))];
    
    userIds.forEach(userId => {
      if (!this.usuariosMap.has(userId)) {
        this.usuariosSvc.getUsuario(userId).subscribe({
          next: (usuario: any) => {
            this.usuariosMap.set(userId, usuario);
          },
          error: err => console.error(`Error al cargar usuario ${userId}:`, err)
        });
      }
    });
  }

  // 👈 NUEVO MÉTODO: Obtener nombre completo del usuario
  getNombreUsuario(userId: number): string {
    const usuario = this.usuariosMap.get(userId);
    if (usuario) {
      return `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim() || 'Usuario Anónimo';
    }
    return 'Cargando...';
  }

  // Métodos de paginación
  onPageChange(page: number, event: Event) {
    event.preventDefault();
    this.paginationSvc.setPage(page);
    this.cargarCalificaciones();
  }

  getPages(): number[] {
    const totalPages = this.paginationSvc.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  crearCalificacion() {
    if (!this.productoId || !this.comentario.trim() || this.estrellas < 1 || this.estrellas > 5) {
      alert('Por favor, completa todos los campos correctamente');
      return;
    }

    this.calificacionesSvc.createPedido({
      id_producto: this.productoId,
      id_usuario: Number(this.userService.getId()),
      descripcion: this.comentario,
      estrellas: this.estrellas
    }).subscribe({
      next: () => {
        this.comentario = '';
        this.estrellas = 5;
        this.paginationSvc.setPage(1);
        this.cargarCalificaciones();
      },
      error: err => console.error('Error al crear calificación:', err)
    });
  }

  setEstrellas(valor: number) {
    this.estrellas = valor;
  }

  getEstrellas(calificacion: number): string[] {
    return Array(5).fill('★').map((_, i) => i < calificacion ? '★' : '☆');
  }

  getPromedioEstrellas(): number {
    if (this.arrayCalificaciones.length === 0) return 0;
    const suma = this.arrayCalificaciones.reduce((acc, cal) => acc + cal.estrellas, 0);
    return Number((suma / this.arrayCalificaciones.length).toFixed(1));
  }

  volver() {
    this.router.navigate(['/productos']);
  }
}