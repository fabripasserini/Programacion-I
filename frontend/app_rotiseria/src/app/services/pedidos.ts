import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoCreate } from '../interfaces/PedidoCreate';
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
  
  getPedidos(page: number, limit: number, nombre: string = '', criterio: string, estado: string, fechaInicio?: string, fechaFin?: string,usuario_id?:number): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('per_page', limit)
      .set(criterio, nombre)
      .set('estado',estado);
    if (fechaInicio && fechaFin) {
      params = params.set('fecha_inicio', fechaInicio).set('fecha_final', fechaFin);
    }
    if (fechaInicio && !fechaFin) {
      params = params.set('fecha', fechaInicio);
    }
    if (usuario_id) {
      params = params.set('id_usuario', usuario_id);
    }
    // Use the selected criterion as the query parameter

    return this.http.get(this.url + '/pedidos', { params });
  }

  cancelarPedido(id: number): Observable<any> {
    return this.http.put(this.url + '/pedido/' + id, { estado: 'cancelado' }, { headers: this.headers });
  }
  getPedido(id: number): Observable<any> {
    return this.http.get(this.url + '/pedido/' + id, { headers: this.headers });
  }

  createPedido(dataCreate: PedidoCreate): Observable<any> {
    return this.http.post(this.url + '/pedidos', dataCreate, { headers: this.headers });
  }

  deletePedido(id: number): Observable<any> {
    return this.http.delete(this.url + '/pedido/' + id, { headers: this.headers });
  }

  updatePedido(pedido: any): Observable<any> {
    return this.http.put(this.url + '/pedido/' + pedido.id, pedido, { headers: this.headers });
  }
}

