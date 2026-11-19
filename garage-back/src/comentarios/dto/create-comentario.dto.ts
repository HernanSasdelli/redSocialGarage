import { IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateComentarioDto {
  @IsMongoId({message:'La publicación no es válida'})
  publicacion: string;

  @IsString({message:'El comentario tiene que ser texto'})
  @IsNotEmpty({message:'El comentario no puede estar vacío'})
  @MaxLength(300, {message:'El comentario puede tener hasta 300 caracteres'})
  texto: string;

  @IsOptional()
  autor: string;//lo pone el controller desde el token
}