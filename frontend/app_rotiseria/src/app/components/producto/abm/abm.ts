import { Component, Input, OnInit } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Productos } from '../../../services/productos';
@Component({
  selector: 'app-producto-abm',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './abm.html',
  styleUrl: './abm.css'
})
export class AbmProducto implements OnInit {
  formProducto: FormGroup;
  @Input() productoId!: string;
  @Input() tipoOperacion!: string;

  constructor(
    private productosSvc: Productos,
    private formBuilder: FormBuilder,

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
    if (this.productoId) {
      this.productosSvc.getProducto(Number(this.productoId)).subscribe({
        next: (res) => {
          console.log('Producto recibido:', res);
          // 👇 actualizamos el formulario con los datos
          this.formProducto.patchValue(res);
        },
        error: (err) => console.error('Error al obtener Producto:', err)
      });
    }
  }
  createProducto() {
    // {
    //     email: this.loginForm.value.email, 
    //     password: this.loginForm.value.password}
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
  updateProducto() {
    if (this.formProducto.valid) {
      const data = { id: this.productoId, ...this.formProducto.value };
      if (!data.password)  delete data.password;
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
  
  deleteProducto(id: string) {
    return this.productosSvc.deleteProducto(Number(id));
    }
  }

