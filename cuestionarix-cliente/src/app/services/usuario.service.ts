import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlBase ="http://localhost:8081";
  
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getUsuarios(): Observable<Usuario[]>{

    const data = {'token': this.cookieService.get('token'), 'id': parseInt(this.cookieService.get('idUsuario')) };
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.post<Usuario[]>(this.urlBase+"/mostrarUsuarios", data, config)
  }

  ingresarSistema(email:string, password:number){

    const data = {'email': email, 'password': password};
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.post(this.urlBase+"/ingresar", data, config)
  }

  eliminarUsuario(idUsuarioPorEliminar: number){
    const data = {
      'token': this.cookieService.get('token'), 
      'id': parseInt(this.cookieService.get('idUsuario')), 
      'idPorBorrar': idUsuarioPorEliminar
    };
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post(this.urlBase+"/borrarUsuario", data, config)
  }

  buscarPorID(idParaBuscar){
    
    const data = {
      'token': this.cookieService.get('token'), 
      'idRecibido': parseInt(this.cookieService.get('idUsuario')), 
      'idParaBuscar': idParaBuscar
    };
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post(this.urlBase+"/buscarPorID", data, config)
  }

  editarUsuario(usuario){
    const data = {
      'token': this.cookieService.get('token'), 
      'idUsuarioSolicitante': parseInt(this.cookieService.get('idUsuario')), 
      'nombres': usuario.nombres,
      "apellidos": usuario.apellidos,
      "cedula": usuario.cedula,
      "password": usuario.password,
      "email": usuario.email,
      "id": usuario.id
    };
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post(this.urlBase+"/modificarUsuario", data, config)
  }

  crearUsuario(usuario){
    const data = {
      'nombres': usuario.nombres,
      "apellidos": usuario.apellidos,
      "cedula": usuario.cedula,
      "password": usuario.password,
      "email": usuario.email
    };
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post(this.urlBase+"/usuarios", data, config)
  }

}
