import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from 'src/app/services/login.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {

  user: Usuario = new Usuario();
  buttonDisabled: boolean = true;
  subscription: Subscription;
  constructor(private loginService: LoginService, private snack: MatSnackBar, private router:Router) { }

  ngOnInit(): void {

    const source = interval(1000); 
    this.subscription = source.subscribe(() => {
      if (this.user.username != ''&& this.user.username != undefined && this.user.password != '' && this.user.username != undefined) {
        this.buttonDisabled = false;
      }else{
        this.buttonDisabled = true;
      }
    });
  }

  public iniciarSesion() {


    this.loginService.generarToken(this.user).subscribe(data => {
      console.log(data);
    }, err => {
      this.snack.open("Credenciales incorrectas", "Aceptar", {
        duration: 3000
      })
    })
  }


}
