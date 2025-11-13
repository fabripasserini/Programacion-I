import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../interfaces/Pedido';
@Injectable({
  providedIn: 'root'
})
export class Pedidos {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';

  private token = localStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  
  getPedidos(page: number, limit: number, nombre: string = '', criterio: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('per_page', limit)
      .set(criterio, nombre); // Use the selected criterion as the query parameter

    return this.http.get(this.url + '/pedidos', { params });
  }


  getPedido(id: number): Observable<any> {
    return this.http.get(this.url + '/pedido/' + id, { headers: this.headers });
  }

  createPedido(dataCreate: Pedido): Observable<any> {
    return this.http.post(this.url + '/pedidos', dataCreate, { headers: this.headers });
  }

  deletePedido(id: number): Observable<any> {
    return this.http.delete(this.url + '/pedido/' + id, { headers: this.headers });
  }

  updatePedido(pedido: any): Observable<any> {
    return this.http.put(this.url + '/pedido/' + pedido.id, pedido, { headers: this.headers });
  }
}

