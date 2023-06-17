import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { Usuario } from 'src/app/model/usuario';
import { CategoriaService } from 'src/app/services/categoria.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.css']
})
export class AgregarCategoriaComponent {

  constructor(private loginService:LoginService, private categoriaService:CategoriaService,
            private router:Router, private snack:MatSnackBar){}

  user:Usuario;
  categoria:Categoria = new Categoria();

  ngOnInit():void{
    this.user = this.loginService.getUser();
  }

  agregarCategoria(){
    if(this.categoria.nombre.length > 3){
      Swal.fire({
        title: 'Agregar categoria',
        text: '¿Estas seguro de que queres agregar esta categoria?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar'
      }).then(resultado => {
        if (resultado.isConfirmed) {
          this.categoriaService.agregarCategoria(this.categoria).subscribe(()=>{
            this.router.navigate(['dashboard']);
            location.reload();
          },()=>{
            Swal.fire("Error","Error al agregar categoria","error");
          });
          
        }
      });
    }
    else{
      this.snack.open("Nombre de categoria muy corto","Aceptar",{
        duration:3000
      })
    }
  }

}
