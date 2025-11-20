import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalificacionAdd } from '../interfaces/CalificacionAdd';
@Injectable({
  providedIn: 'root'
})
export class Calificaciones {


  private http = inject(HttpClient);
  private url = 'http://localhost:3000';

  private token = localStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  
  getCalificaciones(page: number, limit: number, id: number ): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('per_page', limit)
      .set('id_producto', id)
    // Use the selected criterion as the query parameter

    return this.http.get(this.url + '/calificaciones', { params });
  }


 

  createPedido(dataCreate: CalificacionAdd): Observable<any> {
    return this.http.post(this.url + '/calificaciones', dataCreate, { headers: this.headers });
  }


  



}
