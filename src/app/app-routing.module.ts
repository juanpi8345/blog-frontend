import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { AgregarCategoriaComponent } from './pages/agregar-categoria/agregar-categoria.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard', pathMatch:'full'},
  {path:'iniciar-sesion',component:IniciarSesionComponent},
  {path:'registrarse',component:RegistrarseComponent},
  {path: 'dashboard',component:DashboardComponent,children:[
    {path:'agregar-categoria',component:AgregarCategoriaComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
