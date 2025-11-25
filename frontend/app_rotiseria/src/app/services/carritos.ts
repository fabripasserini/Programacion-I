import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarritoAdd } from '../interfaces/CarritoAdd';

@Injectable({
  providedIn: 'root'
})
export class Carritos {

  private http = inject(HttpClient);
  private url = 'http://localhost:3000';

  // Obtener carrito del usuario
  getCarrito(id_usuario: number): Observable<any> {
    return this.http.get(`${this.url}/carrito/${id_usuario}`);
  }

  // Agregar producto al carrito del usuario
  addProducto(id_usuario: number, dataCreate: CarritoAdd): Observable<any> {
    return this.http.post(`${this.url}/carrito/${id_usuario}`, dataCreate);
  }

  // Eliminar un producto del carrito
  deleteProducto(id_carrito: number, id_producto: number): Observable<any> {
    return this.http.delete(`${this.url}/carrito/${id_carrito}`, {
      body: { id_producto }
    });
  }

  // Actualizar cantidad de un producto
  updateProducto(id_carrito: number, data: { id_producto: number, cantidad: number }): Observable<any> {
    return this.http.put(`${this.url}/carrito/${id_carrito}`, data);
  }

  // Vaciar todo el carrito
  limpiarCarrito(id_carrito: number): Observable<any> {
    return this.http.delete(`${this.url}/carrito/${id_carrito}`);
  }

  // Obtener un producto puntual (opcional)
  getProducto(id: number) {
    return this.http.get(`${this.url}/producto/${id}`);
  }
}
