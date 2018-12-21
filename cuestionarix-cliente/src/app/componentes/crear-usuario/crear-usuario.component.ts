import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {
  usuario ={};
  error = false;
  mensaje = "";
  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  crearUsuario(){
    this.usuarioService.crearUsuario(this.usuario)
        .subscribe(resultado => {
          let dataValues = []; //For values
          for(let key in resultado) {   //Pay attention to the 'in'
              dataValues.push(resultado[key]);
          }
          //El servidor me devuelve, error y mensaje, despues del parser el mensaje esta en [1]
          
          console.log(dataValues[1]);
          this.router.navigate(['/mostrarUsuarios']);
        }, error =>{
          console.log("Error");
          
          console.log(error);
          
          this.error = true;
          this.mensaje = error;
          
        });
  }
}


