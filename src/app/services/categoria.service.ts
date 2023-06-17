import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  private apiUrl : string = "http://localhost:8080/categorias/"

  public obtenerCategorias(){
    return this.http.get(this.apiUrl);
  }
}
