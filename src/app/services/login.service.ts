import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public loginStatusSubject = new Subject<any>();

  private apiUrl : string = "http://localhost:8080/";

  public generarToken(user:Usuario){
    return this.http.post(this.apiUrl + "generate-token",user);
  }

  public loginUser(token:string){
    localStorage.setItem("token",token);
  }

  public isLoggedIn():boolean{
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == null || tokenStr == '' || tokenStr == undefined){
      return false;
    }
    return true;
  }

  public logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:Usuario){
    localStorage.setItem("user",JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logOut();
    }
  }

  public getUserRol():string{
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser(){
    return this.http.get(this.apiUrl + "actual-usuario");
  }
}
