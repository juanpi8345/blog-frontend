import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { AgregarCategoriaComponent } from './pages/agregar-categoria/agregar-categoria.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { AgregarPublicacionComponent } from './pages/agregar-publicacion/agregar-publicacion.component';
import { PublicacionComponent } from './pages/publicacion/publicacion.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard', pathMatch:'full'},
  {path:'iniciar-sesion',component:IniciarSesionComponent},
  {path:'registrarse',component:RegistrarseComponent},
  {path: 'dashboard',component:DashboardComponent,children:[
    {path:'agregar-categoria',component:AgregarCategoriaComponent},
    {path:'categoria/:categoriaId',component:CategoriaComponent},
    {path:'agregar-publicacion/:categoriaId',component:AgregarPublicacionComponent},
    {path:'publicacion/:publicacionId',component:PublicacionComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
