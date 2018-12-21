import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService:CookieService, private router:Router) { }

  tienePermiso(){
    //Si ya tiene en las cookies no necesita autenticarse
   
    let tieneCookiesID = false;
    let tieneCookiesToken = false;

    let idUsuario:any;

    idUsuario = this.cookieService.get('idUsuario');

    if(idUsuario){
      tieneCookiesID = true;
      idUsuario = parseInt(idUsuario);
    }

    let token = this.cookieService.get('token');

    if(token){
      tieneCookiesToken = true;
    }
    
    if(tieneCookiesID && tieneCookiesToken && this.router.url === "/login"){
      this.router.navigate(['/mostrarUsuarios']);
    }
    if(!tieneCookiesID || !tieneCookiesToken){
      this.router.navigate(['/login']);
    }
  }
}
