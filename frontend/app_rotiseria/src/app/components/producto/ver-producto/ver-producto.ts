import { Component, OnInit, OnChanges, SimpleChanges, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Productos } from '../../../services/productos';
import { CommonModule } from '@angular/common';
import { PaginationService } from '../../../services/pagination.service';
import { GetUserInfo } from '../../../services/getuserinfo';
import { HttpClient } from '@angular/common/http';
import { Categorias } from '../../../services/categorias';
import { Carritos as CarritosService } from '../../../services/carritos';
import { CarritoAdd } from '../../../interfaces/CarritoAdd';

@Component({
  selector: 'app-ver-producto',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './ver-producto.html',
  styleUrl: './ver-producto.css'
})
export class VerProducto implements OnInit, OnChanges {

  private http = inject(HttpClient);
  Math = Math;
  nombre!: string;
  descripcion!: string;
  criterioBusqueda: string = 'nombre';
  arrayProductos: any[] = [];
  categoriasMap: any = {};

  @Input() categoryId: number | null = null;  // ✔️ Permitir null

  constructor(
    private router: Router,
    private productoSvc: Productos,
    public paginationSvc: PaginationService,
    private userInfo: GetUserInfo,
    private categoriasSvc: Categorias,
    private carritosSvc: CarritosService
  ) {}

  // ---------------------------------------------------------
  // INIT
  // ---------------------------------------------------------
  ngOnInit() {
    console.log('🔄 ngOnInit ejecutado con categoryId:', this.categoryId);
    this.paginationSvc.setPage(1);
    this.cargarCategorias();
    this.loadCarrito();
    this.cargarProductos();
  }

  // ---------------------------------------------------------
  // Detectar cambios en Input
  // ---------------------------------------------------------
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges triggered. Changes:', changes);
    if (changes['categoryId'] && !changes['categoryId'].firstChange) {
      console.log('Categoría cambiada desde Input:', this.categoryId);
      this.paginationSvc.setPage(1);
      this.cargarProductos();
    }
  }

  // ---------------------------------------------------------
  // PRODUCTOS
  // ---------------------------------------------------------
  cargarProductos() {
    let valorBusqueda = this.nombre || '';
    let criterio = this.criterioBusqueda;

    // Si hay categoría seleccionada, usamos el categoryId como filtro
    if (this.categoryId) {
      valorBusqueda = this.categoryId.toString();
      criterio = 'categoria';
    }

    console.log('Buscando productos:', valorBusqueda, 'Criterio:', criterio);

    this.productoSvc.getProductos(
      this.paginationSvc.page,
      this.paginationSvc.itemsPerPage,
      valorBusqueda,
      criterio
    ).subscribe({
      next: (res: any) => {
        this.arrayProductos = res.productos;
        this.paginationSvc.totalItems = Number(res.total);
        console.log('Productos recibidos:', this.arrayProductos);
      },
      error: err => console.error("Error al traer productos:", err)
    });
}

  buscar() {
    this.paginationSvc.setPage(1);
    this.categoryId = null;
    //this.router.navigate(['/productos']);
    this.cargarProductos();
  }

  onPageChange(page: number, event: Event) {
    event.preventDefault();
    this.paginationSvc.setPage(page);
    this.cargarProductos();
  }

  getPages(): number[] {
    const totalPages = this.paginationSvc.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  trackById(item: any) {
    return item.id_producto;
  }

  // ---------------------------------------------------------
  // CATEGORÍAS
  // ---------------------------------------------------------
  cargarCategorias() {
    this.categoriasSvc.getCategorias().subscribe({
      next: (res: any) => {
        this.categoriasMap = {};
        res.forEach((cat: any) => {
          this.categoriasMap[cat.id] = cat.nombre;
        });
      },
      error: err => console.error("Error al cargar categorías", err)
    });
  }

  getCategoriaNombre(id: number) {
    return this.categoriasMap[id] || 'Sin categoría';
  }

  limpiarFiltroCategoria() {
    this.categoryId = null;
    this.router.navigate(['/productos']);
    this.paginationSvc.setPage(1);
    this.cargarProductos();
  }

  // ---------------------------------------------------------
  // CARRITO
  // ---------------------------------------------------------
  productos: any[] = [];
  subtotal: number = 0;
  total: number = 0;

  userId: number | null = null;
  idCarrito: number | null = null;

  loadCarrito() {
    this.userId = this.userInfo.getId();
    if (!this.userId) return;

    this.carritosSvc.getCarrito(this.userId).subscribe({
      next: (res: any) => {
        console.log('Carrito recibido:', res);
        this.idCarrito = res.id_carrito;
      },
      error: err => console.error("Error al obtener carrito:", err)
    });
  }

  agregarProductoCarrito(id_producto: number, cantidad: number) {
    const userId = this.userInfo.getId();

    if (!userId) return;

    const data: CarritoAdd = { id_producto, cantidad };

    this.carritosSvc.addProducto(userId, data).subscribe({
      next: () => alert('Producto agregado al carrito'),
      error: (err) => console.error("Error al agregar producto:", err)
    });
  }
  // ---------------------------------------------------------
  getRol() {
    return this.userInfo.getRol();
  }
  validarCantidad(producto: any) {
  if (producto.cantidad < 1) {
    producto.cantidad = 1;
  }
  if (producto.cantidad > producto.stock) {
    producto.cantidad = producto.stock;
  }
}
verCalificaciones(idProducto: number) {
  // Opción 1: Usando queryParams (recomendado)
  this.router.navigate(['/calificaciones'], {
    queryParams: { modo: 'ver', id_producto: idProducto }
  });
}
}
