import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    this.usuarioService.getUsuarios()
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
  
  eliminarElemento(idUsuarioPorEliminar: number){
    let deseaEliminar = confirm("¿Estas seguro que deseas eliminar el usuario?");
    if(deseaEliminar){
      console.log(idUsuarioPorEliminar);
      this.usuarioService.eliminarUsuario(idUsuarioPorEliminar)
      .subscribe(respuesta => {
        let dataValues = []; //For values
        for(let key in respuesta) {   //Pay attention to the 'in'
            dataValues.push(respuesta[key]);
        }
        //El servidor me devuelve, error y mensaje, despues del parser el mensaje esta en [1]
        
        alert(dataValues[1]);

        //Si se elimino el mismo usuario, redirigo hacia el login, despues de borrar las cookies
        if(parseInt(this.cookieService.get('idUsuario')) == idUsuarioPorEliminar){
          this.cookieService.delete('idUsuario');
          this.cookieService.delete('token');
          this.router.navigate(['/login']);
        }else{
          //Si no es el mismo usuario solo recargo la lista
          this.getUsuarios();
        }
        
      }, error =>{
        console.log("Error");
        
        console.log(error);
        alert(error);
      });
    }
  }
  constructor(
    private usuarioService: UsuarioService, 
    private cookieService: CookieService, 
    private authService: AuthService,
    private router: Router){
  }

  ngOnInit() {
    this.authService.tienePermiso();
    this.idUsuario = parseInt(this.cookieService.get('idUsuario'));
    this.administrador = this.esAdministrador(this.idUsuario);
    this.getUsuarios();
  }

}
