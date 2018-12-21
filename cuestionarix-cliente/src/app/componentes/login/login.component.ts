import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario:any={
    email: "" ,
    password : ""
  }
  error = false;
  mensaje = "";
  
  ingresarSistema(){
    this.usuarioService.ingresarSistema(this.usuario.email, this.usuario.password)
    .subscribe(respuesta => {
      let dataValues = []; //For values
      for(let key in respuesta) {   //Pay attention to the 'in'
          dataValues.push(respuesta[key]);
      }
      //El servidor me devuelve, error, mensaje y token, despues del parser el token esta en [2]
      let respuestaObtenida = dataValues[2];
      
      let token = respuestaObtenida[0];
      this.cookieService.set( "token", token );

      let idUsuario = respuestaObtenida[1];
      this.cookieService.set( "idUsuario", idUsuario );
      this.router.navigate(['/mostrarUsuarios']);
      this.error = false;
      
    }, error =>{
      this.error = true;
      this.mensaje = error.error.message      
    });    
  }


  constructor(
    private usuarioService: UsuarioService, 
    private router: Router, 
    private cookieService: CookieService,
    private authService:AuthService) { }

  ngOnInit() {
    this.authService.tienePermiso();
  }

}
