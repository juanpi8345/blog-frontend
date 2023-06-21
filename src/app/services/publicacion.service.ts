import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria';
import { Publicacion } from '../model/publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(private http:HttpClient) { }

  private apiUrl : string = "http://localhost:8080/publicaciones/"

  public obtenerPublicacionesPorCategoria(categoriaId:number){
    return this.http.get(this.apiUrl + "categoria/"+categoriaId)
  }

  public obtenerPublicacionPorId(publicacionId:number){
    return this.http.get(this.apiUrl+publicacionId )
  }

  public guardarPublicacion(usuarioId:number, categoriaId:number, publicacion:Publicacion){
    return this.http.post(this.apiUrl + "usuario/"+usuarioId+"/categoria/"+categoriaId,publicacion);
  }


}
