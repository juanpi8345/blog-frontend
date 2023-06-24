import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { Categoria } from 'src/app/model/categoria';
import { Publicacion } from 'src/app/model/publicacion';
import { Usuario } from 'src/app/model/usuario';
import { CategoriaService } from 'src/app/services/categoria.service';
import { LoginService } from 'src/app/services/login.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {

  constructor(private route: ActivatedRoute, private publicacionService: PublicacionService, private router:Router, private loginService:LoginService,
    private snack:MatSnackBar, private categoriaService : CategoriaService) { }

  categoriaId: number;
  suscription: Subscription;
  publicaciones: Publicacion[];
  fecha: Date = new Date();
  usuario:Usuario;
  usuarioRol : string;

  ngOnInit(): void {
    this.usuario = this.loginService.getUser();
    this.usuarioRol = this.loginService.getUserRol();
    this.route.params.subscribe(params => {
      this.categoriaId = params['categoriaId'];
      this.publicacionService.obtenerPublicacionesPorCategoria(this.categoriaId).subscribe((publicaciones: Publicacion[]) => {
        this.publicaciones = publicaciones;
        console.log(publicaciones)
        for (let i = 0; i < publicaciones.length; i++) {
          this.fecha = new Date(this.publicaciones[i].fechaCreacion);
          const año = this.fecha.getFullYear();
          const mes = this.fecha.getMonth() + 1;
          const dia = this.fecha.getDate();
          this.publicaciones[i].fechaFormateada = `${año}/${mes}/${dia}`;
        }
      });
    })
  }

  verPublicacion(publicacionId:number){
    this.router.navigate(['/dashboard/publicacion/'+publicacionId]);
  }

  eliminarPublicacion(publicacionId:number){
    Swal.fire({
      title: 'Eliminar publicacion',
      text: '¿Estas seguro de que queres eliminar esta publicacion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(resultado => {
      if (resultado.isConfirmed) {
        this.publicacionService.eliminarPublicacion(publicacionId).subscribe(()=>{
          this.publicacionService.obtenerPublicacionesPorCategoria(this.categoriaId).subscribe((publicaciones:Publicacion[])=>{
            this.publicaciones = publicaciones;
          })
        },()=>this.snack.open("Error al eliminar publicacion","Aceptar",{
          duration:3000
        }))
      }
    });
  }

  editarPublicacion(publicacionId:number){
    this.router.navigate(['/dashboard/editar-publicacion/'+publicacionId]);
  }

  eliminarCategoria(categoriaId : number){
    Swal.fire({
      title: 'Eliminar publicacion',
      text: '¿Estas seguro de que queres eliminar esta categoria?, todas las publicaciones dentro de la categoria tambien lo haran',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(resultado => {
      if (resultado.isConfirmed) {
        this.categoriaService.eliminarCategoria(categoriaId).subscribe(()=>{
          this.router.navigate(['/dashboard']).then(()=>{
            location.reload();
          });
        },()=>this.snack.open("Error al eliminar la categoria","Aceptar",{
          duration:3000
        }))
      } 
    });
  }

}



