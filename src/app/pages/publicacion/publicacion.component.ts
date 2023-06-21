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
  publicacionId:number;
  publicacion : Publicacion = new Publicacion();


  ngOnInit():void{
    this.publicacionId = this.route.snapshot.params['publicacionId'];
    this.publicacionService.obtenerPublicacionPorId(this.publicacionId).subscribe((publicacion:Publicacion)=>{
      this.publicacion = publicacion;
      console.log(this.publicacion)
    },()=>{
      this.snack.open("Error al obtener publicacion","Aceptar",{
        duration:3000
      })
    })
  }
}
