import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@
Injectable({
  providedIn: 'root'
})
export class Categorias {
  

   
  private http = inject(HttpClient);

  url = 'http://localhost:3000';

  getCategorias(): Observable<any>{
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url + '/categorias', { headers });
  }
  createCategoria(nombre: string): Observable<any>{
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.url + '/categorias', { nombre }, { headers });
  }
}