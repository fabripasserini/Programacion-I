import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../interfaces/Pedido';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';

  private token = localStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  getPedidos(): Observable<any> {
    return this.http.get(this.url + '/pedidos', { headers: this.headers });
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

