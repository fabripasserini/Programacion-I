
import { Injectable,Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Reg {
  private http=inject(HttpClient);
  //contructor(private http: HttpClient) {}
  url='http://localhost:3000';
  // login(): Observable<any>{ // lo que hace el obserrvable, te podes suscribir y podes hacer que te avise cuando haya un dato nuevo asi podes capturarlo para hacer alguna accion
  //   let dataLogin={
  //     email:'manuel@gmail.com',
  //     password:'123456'
  //   }
  register(dataRegister:RegisterRequest): Observable<any>{
    return this.http.post(this.url+'/auth/register',dataRegister);
  }
}
