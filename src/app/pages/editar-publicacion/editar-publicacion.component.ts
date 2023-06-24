import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Publicacion } from 'src/app/model/publicacion';
import { PublicacionService } from 'src/app/services/publicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-publicacion',
  templateUrl: './editar-publicacion.component.html',
  styleUrls: ['./editar-publicacion.component.css']
})
export class EditarPublicacionComponent {

  constructor(private route:ActivatedRoute, private publicacionService:PublicacionService, private router:Router,
    private snack:MatSnackBar){}

  publicacion:Publicacion;

  ngOnInit():void{
    this.publicacionService.obtenerPublicacionPorId(this.route.snapshot.params['publicacionId']).subscribe((publicacion:Publicacion)=>{
      this.publicacion = publicacion;
      console.log(this.publicacion.autor.usuarioId);
      console.log(this.publicacion);
    })
  }

  actualizarPublicacion(){
    if (this.publicacion.titulo.length >= 3 || this.publicacion.titulo.length <= 15 
      && this.publicacion.descripcion.length >= 10 || this.publicacion.descripcion.length <= 30
      && this.publicacion.contenido.length >= 20 || this.publicacion.contenido.length <=300) {
      this.publicacionService.editarPublicacion(this.publicacion.autor.usuarioId, this.publicacion).subscribe(() => {
        Swal.fire("Publicacion actualizada con exito!","La publicacion se actualizo correctamente","success");
        this.router.navigate(['/dashboard']);
      },()=>{
        this.snack.open("Error al actualizar publicacion","Aceptar",{
          duration:3000
        })
      })
    } else {
      this.snack.open("Requisitos no cumplidos", "Aceptar", {
        duration: 3000
      });
    }
  }


}
