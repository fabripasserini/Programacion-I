import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class Usuarios {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';
  private token = localStorage.getItem('token') || '';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`
  });

  getUsuarios(page: number, limit: number, nombre: string = '', criterio: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('per_page', limit)
      .set(criterio, nombre); // Use the selected criterion as the query parameter

    return this.http.get(this.url + '/usuarios', { headers: this.headers, params });
  }

  getUsuario(id: number): Observable<any> {
    return this.http.get(`${this.url}/usuario/${id}`, { headers: this.headers });
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.url}/usuario/${id}`, { headers: this.headers });
  }

  updateUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.url}/usuario/${usuario.id}`, usuario, { headers: this.headers });
  }
}