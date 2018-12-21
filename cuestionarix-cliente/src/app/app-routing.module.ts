import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UsuariosComponent} from './componentes/usuarios/usuarios.component';
import {LoginComponent} from './componentes/login/login.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'mostrarUsuarios', component: UsuariosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
