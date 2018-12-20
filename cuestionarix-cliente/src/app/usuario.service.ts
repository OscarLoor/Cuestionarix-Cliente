import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlBase ="http://localhost:8081";
  
  constructor(private http: HttpClient,) { }

  getUsuarios(token:string, id:number): Observable<Usuario[]>{

    const data = {'token': token, 'id': id};
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.post<Usuario[]>(this.urlBase+"/mostrarUsuarios", data, config)
  }

  ingresarSistema(email:string, password:number){

    const data = {'email': email, 'password': password};
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.post(this.urlBase+"/ingresar", data, config)
  }

}
