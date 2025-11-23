import { Component, Input, OnInit } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Productos } from '../../../services/productos';
import { Categorias } from '../../../services/categorias';
@Component({
  selector: 'app-producto-abm',
  imports: [RouterLink, ReactiveFormsModule,FormsModule],
  templateUrl: './abm.html',
  styleUrl: './abm.css'
})
export class AbmProducto implements OnInit {
  formProducto: FormGroup;
  @Input() productoId!: string;
  @Input() tipoOperacion!: string;
  arrayCategorias: any[] = [];
  nuevaCategoria: string = '';
  mostrarInputCategoria: boolean = false;
  categorias: any[] = [];
  private categoriasMap: any = {};
  constructor(
    private productosSvc: Productos,
    private formBuilder: FormBuilder,
    private categoriasSvc: Categorias,

  ) {
    this.formProducto = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', [Validators.required]],
      id_categoria: ['', Validators.required], ///// en el html habra que hacer que se vea las categorias con un select
    });
  }

  ngOnInit() {
    this.categoriasSvc.getCategorias().subscribe({
      next: (categoriasRes) => {
        this.arrayCategorias = categoriasRes;
        this.categoriasMap = {};
        categoriasRes.forEach((cat: any) => {
          this.categoriasMap[cat.id] = cat.nombre;
        });

        if (this.productoId && this.tipoOperacion === 'Modificar') {
          this.productosSvc.getProducto(Number(this.productoId)).subscribe({
            next: (productoRes) => {
              console.log('Producto recibido:', productoRes);
              this.formProducto.patchValue(productoRes);
            },
            error: (err) => console.error('Error al obtener Producto:', err)
          });
        }
      },
      error: (err) => console.error("Error al cargar categorías", err)
    });
  }
  createProducto() {
  console.log('Datos del formulario:', this.formProducto.value);
  console.log('Formulario válido?', this.formProducto.valid);
  console.log('Errores:', this.formProducto.errors);
  
  if (!this.formProducto.valid) {
    alert('El formulario tiene errores. Revisa todos los campos.');
    return;
  }

  this.productosSvc.createProducto(this.formProducto.value).subscribe({
    next: (res:any) => {
      alert("Registro exitoso");
      console.log("Respuesta registro: ", res);
    },
    error: (err) => {
      alert("Error");
      console.log("Error en el registro:", err);
    }
  }) 
}
  updateProducto(id: string) {
    if (this.formProducto.valid) {
      const data = { id_producto: Number(id), ...this.formProducto.value };
      console.log('Data to be updated:', data);
      this.productosSvc.updateProducto(data).subscribe({
        next: (res) => {
          console.log('Producto actualizado:', res);
          alert('Producto modificado correctamente');
        },
        error: (err) => console.error('Error al modificar producto:', err) 
      });
    } else {
      console.warn('Formulario inválido');
    }
  }
  createCategoria(nombre: string) {
    this.categoriasSvc.createCategoria(nombre).subscribe({
      next: (res: any) => {
        console.log('Categoria creada:', res);
        alert('Categoria creada correctamente');
      },
      error: (err: any) => console.error('Error al crear categoria:', err)
    });
  }
  
  deleteProducto(id: string) {
  this.productosSvc.deleteProducto(Number(id)).subscribe({
    next: (res: any) => {
      console.log('Producto eliminado:', res);
      alert('Producto eliminado correctamente');
    },
    error: (err: any) => {
      console.error('Error al eliminar producto:', err);
      alert('Error al eliminar el producto');
    }
  });
}

  
  cargarCategorias() {
  this.categoriasSvc.getCategorias().subscribe({
    next: (res: any) => {
      this.arrayCategorias = res;  // ← NECESARIO

      this.categoriasMap = {};
      res.forEach((cat: any) => {
        this.categoriasMap[cat.id] = cat.nombre;
      });
    },
    error: (err: any) => console.error("Error al cargar categorías", err)
  });
}

  getCategoriaNombre(id: number) {
    return this.categoriasMap[id] || 'Sin categoría';
  }
  trackById(item: any) {
    return item.id;
  }
  agregarCategoria() {
  if (!this.nuevaCategoria.trim()) return;

  this.categoriasSvc.createCategoria(this.nuevaCategoria).subscribe({
    next: (res: any) => {
      console.log('Respuesta:', res);
      
      // Como el backend no devuelve el ID, recargamos todas las categorías
      this.categoriasSvc.getCategorias().subscribe({
        next: (categorias: any) => {
          this.arrayCategorias = categorias;
          
          // Actualizar el mapa
          this.categoriasMap = {};
          categorias.forEach((cat: any) => {
            this.categoriasMap[cat.id] = cat.nombre;
          });
          
          // Buscar la categoría recién creada por nombre
          const categoriaCreada = categorias.find(
            (cat: any) => cat.nombre === this.nuevaCategoria
          );
          
          if (categoriaCreada) {
            // Setear en el formulario
            this.formProducto.patchValue({
              id_categoria: categoriaCreada.id
            });
            
            console.log('✅ Categoría seleccionada:', categoriaCreada);
            console.log('✅ Formulario:', this.formProducto.value);
            
            alert('Categoría creada y seleccionada correctamente');
          }
          
          this.mostrarInputCategoria = false;
          this.nuevaCategoria = '';
        },
        error: (err) => console.error('Error al recargar categorías:', err)
      });
    },
    error: (err) => {
      console.error("Error al crear la categoría:", err);
      alert('Error al crear la categoría');
    }
  });
}

}