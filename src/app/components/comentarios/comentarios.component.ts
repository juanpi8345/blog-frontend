import { Component } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent {

  constructor(private loginService:LoginService){}
  usuario:Usuario = new Usuario();

  ngOnInit():void{
    this.usuario = this.loginService.getUser();
  }

}
