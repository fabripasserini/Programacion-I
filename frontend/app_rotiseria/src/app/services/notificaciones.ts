import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificacionCreate } from '../interfaces/NotificacionCreate';
@Injectable({
  providedIn: 'root'
})
export class Notificaciones {
  
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';

  private token = localStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  
  getNotificaciones(userId: number, sort: 'asc' | 'desc' = 'desc'): Observable<any> {
  let params = new HttpParams()
    .set('id_usuario', userId)
    .set('sort', sort);

  return this.http.get(this.url + '/notificaciones', { params });
}




  createNotificacion(payload: { usuarios: number[] | "todos", informacion: string }): Observable<any> {
    return this.http.post(this.url + '/notificaciones', payload, { headers: this.headers });
}



 
}

