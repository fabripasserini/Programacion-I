import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@
Injectable({
  providedIn: 'root'
})
export class VerCategorias {
  

   
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
}