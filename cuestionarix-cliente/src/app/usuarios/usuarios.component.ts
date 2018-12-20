import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarioNuevo: Usuario ={
    id: 1,
    nombres: "Oscar Andres",
    apellidos: "Loor Landeta",
    cedula: "1723479117",
    email: "o.loor@loah.ec",
    password: "brcript.clave",
    fechaCreacion: "2018-12-19 23:16:40",
    fechaActualizacion: "2018-12-19 23:16:40",
    fechaUltimoAcceso: "2018-12-19 23:16:40"
  }

  constructor() { }

  ngOnInit() {
  }

}
