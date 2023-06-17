import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private loginService:LoginService, private router:Router){}

  logged:boolean;
  usuario:Usuario;
  rol:string = '';

  ngOnInit():void{

    this.logged = this.loginService.isLoggedIn();
    this.usuario = this.loginService.getUser();
    this.rol = this.loginService.getUserRol();

    this.loginService.loginStatusSubject.asObservable().subscribe(data=>{
      this.logged = this.loginService.isLoggedIn();
      this.usuario = this.loginService.getUser();
      this.rol = this.loginService.getUserRol();
    })
  }

  cerrarSesion(){
    this.loginService.logOut();
    this.logged = false;
    this.router.navigate(['iniciar-sesion']);
  }

}
