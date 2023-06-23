import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { Publicacion } from 'src/app/model/publicacion';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {

  constructor(private route: ActivatedRoute, private publicacionService: PublicacionService, private router:Router) { }

  categoriaId: number;
  suscription: Subscription;
  publicaciones: Publicacion[];
  fecha: Date = new Date();

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoriaId = params['categoriaId'];
      this.publicacionService.obtenerPublicacionesPorCategoria(this.categoriaId).subscribe((publicaciones: Publicacion[]) => {
        this.publicaciones = publicaciones;
        console.log(this.publicaciones)
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
}


