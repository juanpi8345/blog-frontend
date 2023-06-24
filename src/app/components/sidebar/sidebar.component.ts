import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { Publicacion } from 'src/app/model/publicacion';
import { Usuario } from 'src/app/model/usuario';
import { CategoriaService } from 'src/app/services/categoria.service';
import { LoginService } from 'src/app/services/login.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private categoriaService:CategoriaService, private router:Router, private loginService:LoginService){}

  categorias:Categoria[];
  publicaciones:Publicacion[];
  usuario:Usuario;
  usuarioRol : string;

  ngOnInit():void{
    this.usuario = this.loginService.getUser();
    this.usuarioRol = this.loginService.getUserRol();
    this.categoriaService.obtenerCategorias().subscribe((data:Categoria[])=>{
      this.categorias = data;
    },()=>{
      Swal.fire("Error al cargar","Error al cargar categorias de posts","error");
    })
  }

  cambiarCategoria(categoriaId:number){
    this.router.navigate(['/dashboard/categoria/'+categoriaId]);
  }



}
