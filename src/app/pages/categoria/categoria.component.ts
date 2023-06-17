import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { Publicacion } from 'src/app/model/publicacion';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {

  constructor(private route: ActivatedRoute, private publicacionService: PublicacionService) { }
  categoriaId: number;
  suscription: Subscription;
  publicaciones: Publicacion[];

  ngOnInit(): void {
    this.categoriaId = this.route.snapshot.params['categoriaId'];
    const source = interval(500);
    this.suscription = source.subscribe(() => {
      this.categoriaId = this.route.snapshot.params['categoriaId'];
    });
    this.publicacionService.obtenerPublicacionesPorCategoria(this.categoriaId).subscribe((publicacion: Publicacion[]) => {
      this.publicaciones = publicacion;
    });
  }

}
