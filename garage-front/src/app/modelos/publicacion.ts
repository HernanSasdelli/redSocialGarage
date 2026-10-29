export interface Publicacion {
    _id: string; 
    titulo: string;
    descripcion:string;
    imagen?:string;
    fecha: string;
    autor: Autor;
    meGusta: MeGusta[];
    comentarios: Comentarios[];
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