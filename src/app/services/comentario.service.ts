import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from '../model/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http:HttpClient) { }

  private apiUrl : string = "http://localhost:8080/comentarios/"

  public comentar(comentario:Comentario, publicacionId:number, usuarioId:number){
    return this.http.post(this.apiUrl + "publicacion/"+publicacionId + "/usuario/"+usuarioId, comentario);
  }

  public obtenerComentariosDeLaPublicacion(publicacionId:number){
    return this.http.get(this.apiUrl + "publicacion/"+publicacionId);
  }

  
}
