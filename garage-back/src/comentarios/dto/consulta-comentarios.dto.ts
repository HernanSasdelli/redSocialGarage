import { IsInt, IsMongoId, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ConsultaComentariosDto {
  @IsMongoId({message:'La publicación no es válida'})
  publicacion: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({message:'El offset tiene que ser un número entero'})
  @Min(0, {message:'El offset no puede ser negativo'})
  offset?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({message:'El limit tiene que ser un número entero'})
  @Min(1, {message:'El limit tiene que ser al menos 1'})
  @Max(20, {message:'El limit no puede ser más de 20'})
  limit?: number;
}