import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from 'src/app/model/publicacion';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent {

  constructor(private publicacionService:PublicacionService, private route:ActivatedRoute, private snack:MatSnackBar){}
  fechaCreacion:Date = new Date();
  fechaActualizacion:Date = new Date();
  publicacionId:number;
  publicacion : Publicacion = new Publicacion();


  ngOnInit():void{
    this.publicacionId = this.route.snapshot.params['publicacionId'];
    this.publicacionService.obtenerPublicacionPorId(this.publicacionId).subscribe((publicacion:Publicacion)=>{
      this.publicacion = publicacion;
      this.fechaCreacion = new Date(this.publicacion.fechaCreacion);
          const año = this.fechaCreacion.getFullYear();
          const mes = this.fechaCreacion.getMonth() + 1;
          const dia = this.fechaCreacion.getDate();
          this.publicacion.fechaFormateada = `${año}/${mes}/${dia}`;

          this.fechaActualizacion = new Date(this.publicacion.fechaActualizacion);
          const añoAct = this.fechaActualizacion.getFullYear();
          const mesAct = this.fechaActualizacion.getMonth() + 1;
          const diaAct = this.fechaActualizacion.getDate();
          this.publicacion.fechaActualizacionFormateada = `${añoAct}/${mesAct}/${diaAct}`;
    },()=>{
      this.snack.open("Error al obtener publicacion","Aceptar",{
        duration:3000
      })
    })
  }
}
