import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuariosUrl = 'http://localhost:8081/mostrarUsuarios';  // URL to web api

  constructor(private http: HttpClient,) { }
  getUsuarios(token:string, id:number): Observable<Usuario[]>{

    const data = {'token': token, 'id': id};
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.post<Usuario[]>(this.usuariosUrl, data, config)
  }
}
