import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  private apiUrl : string = "http://localhost:8080/usuarios/";

  public obtenerUsuarios(){
    return this.http.get(this.apiUrl);
  }

  public registrarUsuario(user:Usuario){
    return this.http.post(this.apiUrl,user);
  }

}
