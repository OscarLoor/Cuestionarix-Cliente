import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  usuario ={};
  idUsuarioParaEditar:number;
  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.tienePermiso();
    this.idUsuarioParaEditar = parseInt(this.route.snapshot.paramMap.get("idUsuarioParaEditar"))
    console.log(this.idUsuarioParaEditar);
    this.buscarPorID(this.idUsuarioParaEditar);
    //Obtengo los datos del usuario desde la base de datos
     
  }

  buscarPorID(idParaBuscar:number): void{
    this.usuarioService.buscarPorID(idParaBuscar)
    .subscribe(usuarios => {
      let dataValues = []; //For values
      for(let key in usuarios) {   //Pay attention to the 'in'
          dataValues.push(usuarios[key]);
      }
      //El servidor me devuelve, error y mensaje, despues del parser el mensaje esta en [1]
      this.usuario = dataValues[1]
      console.log(this.usuario);
      
    }, error =>{
      console.log("Error");
      
      console.log(error);
      this.router.navigate(['/mostrarUsuarios']);
    });
  }

  editarUsuario(){
    this.usuario;
    this.usuarioService.editarUsuario(this.usuario)
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
        alert(error);
        
      });
  }

}
