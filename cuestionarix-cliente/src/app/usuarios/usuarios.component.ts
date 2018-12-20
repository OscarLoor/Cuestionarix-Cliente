import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  idUsuario:number;
  token: string;
  administrador: boolean;

  public esAdministrador(idRecibido){
      if((idRecibido % 3) == 0 || idRecibido == 1){
          return true;
      }else{
          return false;
      }
  }

  public editar(idRecibido) {
    console.log("Editar"+idRecibido);
      
  }
  public eliminar(idRecibido) {
    console.log("Eliminar"+idRecibido);
    
  }
  getUsuarios(): void{
    this.usuarioService.getUsuarios(this.token, this.idUsuario)
    .subscribe(usuarios => {
      let dataValues = []; //For values
      for(let key in usuarios) {   //Pay attention to the 'in'
          dataValues.push(usuarios[key]);
      }
      //El servidor me devuelve, error y mensaje, despues del parser el mensaje esta en [1]
      this.usuarios = dataValues[1]
    }, error =>{
      console.log("Error");
      console.log(error);
      
    });
  }
  
  constructor(private usuarioService: UsuarioService, private cookieService: CookieService){
    
  }

  ngOnInit() {
    this.idUsuario = parseInt(this.cookieService.get('idUsuario'));
    this.administrador = this.esAdministrador(this.idUsuario);
    this.token = this.cookieService.get('token');
    this.getUsuarios();
  }

}
