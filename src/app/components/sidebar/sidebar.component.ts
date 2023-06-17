import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private categoriaService:CategoriaService){}

  ngOnInit(){

    
  }

}
