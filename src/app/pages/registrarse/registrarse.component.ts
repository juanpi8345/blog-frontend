import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from 'src/app/services/login.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {

  user: Usuario = new Usuario();
  passwordConfirm:string;
  buttonDisabled: boolean = true;
  subscription: Subscription;
  constructor(private loginService: LoginService, private snack: MatSnackBar, private router:Router, private userService:UserServiceService) { }

  ngOnInit(): void {

    const source = interval(1000); 
    this.subscription = source.subscribe(() => {
      if (this.user.username != ''&& this.user.username != undefined && this.user.password != '' && this.user.username != undefined
      && this.passwordConfirm != '' && this.passwordConfirm != undefined) {
        this.buttonDisabled = false;
      }else{
        this.buttonDisabled = true;
      }
    });
  }


  registrarse(){
    if(this.user.password != this.passwordConfirm){
      this.snack.open("Las claves no coinciden","Aceptar",{
        duration:3000
      })
      return;
    }else{
      if(this.user.username.length >= 3 && this.user.password.length >= 5){
        this.userService.obtenerUsuarios().subscribe((data:Usuario[])=>{
          for(let user of data){
            if(user.username === this.user.username){
              this.snack.open("Ya existe ese username","Aceptar",{
                duration:3000
              })
              return;
            }
          }
          this.userService.registrarUsuario(this.user).subscribe(()=>{
            Swal.fire("Usuario registrado","Se registro el usuario con exito","success")
            this.router.navigate(['/iniciar-sesion']);
          },()=>{
            Swal.fire("Error","Error al registrar usuario","error");
          })
        },()=>{
          Swal.fire("Error","Error al cargar la base de datos","error");
        })
      }else{
        this.snack.open("No se cumplen los requisitos para el registro","Aceptar",{
          duration:3000
        })
      }
    }

    

  }

}
