import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class Usuarios {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';

  getUsuarios(page: number, limit: number, nombre: string = '', criterio: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('per_page', limit)
      .set(criterio, nombre); // Use the selected criterion as the query parameter

    return this.http.get(this.url + '/usuarios', { params });
  }

  getUsuario(id: number): Observable<any> {
    return this.http.get(`${this.url}/usuario/${id}`);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.url}/usuario/${id}`);
  }

  updateUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.url}/usuario/${usuario.id}`, usuario);
  }
  getUsuariosSinPaginacion(nombre: string = '', criterio: string): Observable<any> {
    let params = new HttpParams()
      .set(criterio, nombre); // Use the selected criterion as the query parameter

    return this.http.get(this.url + '/usuarios', { params });
  }
  getTodosLosUsuarios(): Observable<any> {
    return this.http.get(this.url + '/usuarios');
  }
}