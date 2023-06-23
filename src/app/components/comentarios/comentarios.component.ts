import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/model/comentario';
import { Usuario } from 'src/app/model/usuario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent {

  constructor(private loginService: LoginService, private route: ActivatedRoute, private comentarioService: ComentarioService,
    private snack: MatSnackBar) { }
  comentarios:Comentario[];
  comentario: Comentario = new Comentario();
  usuario: Usuario = new Usuario();
  usuarioRol : string;
  publicacionId: number;

  ngOnInit(): void {
    this.usuario = this.loginService.getUser();
    this.usuarioRol = this.loginService.getUserRol();
    this.publicacionId = this.route.snapshot.params['publicacionId'];
    this.comentarioService.obtenerComentariosDeLaPublicacion(this.publicacionId).subscribe((comentarios:Comentario[])=>{
      this.comentarios = comentarios;
      console.log(this.comentarios[0])
    })
  }
  
  comentar() {
    if (this.comentario.descripcion.length > 0) {
      this.comentarioService.comentar(this.comentario, this.publicacionId, this.usuario.usuarioId).subscribe((comentario:Comentario) => {
        Swal.fire("Comentario realizado", "Comentario realizado con exito", "success");

        this.comentarioService.obtenerComentariosDeLaPublicacion(this.publicacionId).subscribe((comentarios:Comentario[])=>{
          this.comentarios = comentarios;
        })
        this.comentario.descripcion = "";
      })
    } else {
      this.snack.open("El comentario no puede estar vacio", "Aceptar", {
        duration: 3000
      })
    }
  }

  eliminarComentario(comentarioId:number){
    Swal.fire({
      title: 'Eliminar comentario',
      text: '¿Estas seguro de que queres eliminar este comentario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(resultado => {
      if (resultado.isConfirmed) {
        this.comentarioService.eliminarComentario(comentarioId).subscribe(()=>{
          this.comentarioService.obtenerComentariosDeLaPublicacion(this.publicacionId).subscribe((comentarios:Comentario[])=>{
            this.comentarios = comentarios;
          })
        },()=>this.snack.open("Error al eliminar comentario","Aceptar",{
          duration:3000
        }));
        
      }
    });
  }

}
