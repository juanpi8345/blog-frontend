import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Publicacion } from 'src/app/model/publicacion';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from 'src/app/services/login.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregar-publicacion',
  templateUrl: './agregar-publicacion.component.html',
  styleUrls: ['./agregar-publicacion.component.css']
})
export class AgregarPublicacionComponent {

  constructor(private publiacionService: PublicacionService, private snack: MatSnackBar,
    private loginService: LoginService, private route: ActivatedRoute, private router:Router) { }

  publicacion: Publicacion = new Publicacion();
  categoriaId: number;

  user: Usuario = new Usuario();

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.categoriaId = this.route.snapshot.params['categoriaId'];
  
  }

  agregarPublicacion() {
    if (this.publicacion.titulo.length >= 3 && this.publicacion.descripcion.length >= 10
      && this.publicacion.contenido.length >= 20) {
      this.publiacionService.guardarPublicacion(this.user.usuarioId, this.categoriaId, this.publicacion).subscribe(() => {
        Swal.fire("Publicacion añadida con exito!","La publicacion se guardo correctamente","success");
        this.router.navigate(['/dashboard']);
      },()=>{
        this.snack.open("Error al guardar categoria","Aceptar",{
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
