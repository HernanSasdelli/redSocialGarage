import { IsNotEmpty, IsString, MaxLength } from 'class-validator';


//saque el partial que es generico sin validacion
export class UpdateComentarioDto {
  @IsString({message:'El comentario tiene que ser texto'})
  @IsNotEmpty({message:'El comentario no puede estar vacío'})
  @MaxLength(200, {message:'El comentario puede tener hasta 200 caracteres'})
  texto: string;
}