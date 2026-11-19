export interface Publicacion {
    _id: string; 
    titulo: string;
    descripcion:string;
    imagen?:string;
    fecha: string;
    autor: Autor;
    meGusta: MeGusta[];
    cantidadMeGusta: number;
    cantidadComentarios: number;

    //agregar cuando llegue
    comentarios?: Comentarios[];
}

export interface Comentarios
{
    _id: string;
    autor: Autor;
    texto: string;
    fecha: string;
    publicacion: string;
}

export interface Autor 
{
    _id: string;
    usuario: string;
    foto: string;
}

export interface MeGusta{
    usuario: string;
    fecha: string;
}

export interface Resultado {
    publicaciones: Publicacion[];
    total: number;
}
export interface Comentarios
{
    _id: string;
    autor: Autor;
    texto: string;
    fecha: string;
    publicacion: string;
    modificado: boolean;
}
export interface ResultadoComentarios {
    comentarios: Comentarios[];
    total: number;
}