import { Component } from '@angular/core';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private categoriaService:CategoriaService){}

  categorias:Categoria[];

  ngOnInit():void{
    this.categoriaService.obtenerCategorias().subscribe((data:Categoria[])=>{
      this.categorias = data;
      console.log(data);
    },()=>{
      Swal.fire("Error al cargar","Error al cargar categorias de posts","error");
    })
  }

}
