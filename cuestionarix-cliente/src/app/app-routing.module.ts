import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UsuariosComponent} from './componentes/usuarios/usuarios.component';
import {LoginComponent} from './componentes/login/login.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { CrearUsuarioComponent } from './componentes/crear-usuario/crear-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'mostrarUsuarios', component: UsuariosComponent },
  { path: 'editarUsuario/:idUsuarioParaEditar', component: EditarUsuarioComponent },
  { path: 'agregarUsuario', component: CrearUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
