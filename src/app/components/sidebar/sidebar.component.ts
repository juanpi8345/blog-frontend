import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { Publicacion } from 'src/app/model/publicacion';
import { CategoriaService } from 'src/app/services/categoria.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private categoriaService:CategoriaService, private router:Router){}

  categorias:Categoria[];
  publicaciones:Publicacion[];

  ngOnInit():void{
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
