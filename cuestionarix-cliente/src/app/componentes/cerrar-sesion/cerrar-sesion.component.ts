import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.scss']
})
export class CerrarSesionComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  cerrarSesion(){
    this.cookieService.delete('idUsuario');
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
  ngOnInit() {
  }

}
