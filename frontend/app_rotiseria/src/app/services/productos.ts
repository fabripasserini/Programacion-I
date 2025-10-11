import { Injectable,Inject, inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class Productos {
  private http = inject(HttpClient);

  url = 'http://localhost:3000';

  getUsuarios(): Observable<any>{
    const token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.url + '/productos', { headers });
  }
  // getUsuario(email: string): Observable<any> {
  // const token = localStorage.getItem('token') || '';
  // let headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${token}`
  // });

  // return this.http.get(this.url + '/usuarios?email=' + encodeURIComponent(email), { headers });
  // }
}
