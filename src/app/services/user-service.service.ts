import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

  private apiUrl : string = "http://localhost:8080/usuarios";


  

}
