import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http:HttpClient) { }

  private apiUrl : string = "http://localhost:8080/comentarios/"

  public obtenerComentariosDeLaPublicacion(publicacionId:number){
    return this.http.get(this.apiUrl + "publicacion/"+publicacionId)
  }
}
