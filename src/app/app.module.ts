import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { authInterceptorProviders } from './services/token.interceptor';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { AgregarCategoriaComponent } from './pages/agregar-categoria/agregar-categoria.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { AgregarPublicacionComponent } from './pages/agregar-publicacion/agregar-publicacion.component';
import { PublicacionComponent } from './pages/publicacion/publicacion.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IniciarSesionComponent,
    DashboardComponent,
    SidebarComponent,
    RegistrarseComponent,
    AgregarCategoriaComponent,
    CategoriaComponent,
    AgregarPublicacionComponent,
    PublicacionComponent,
    ComentariosComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
