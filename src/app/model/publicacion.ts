import { Categoria } from "./categoria";
import { Usuario } from "./usuario";

export class Publicacion {
    publicacionId:number;
    titulo:string;
    fechaCreacion : Date = new Date();
    fechaActualizacion: Date = new Date() ;
    descripcion:string;
    contenido:string;
    fechaFormateada : string ;
    fechaActualizacionFormateada : string ;
    autor:Usuario;
    categoria:Categoria;
}
