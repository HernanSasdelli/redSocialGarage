import { IsMongoId, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePublicacionDto {
  @IsString({ message: 'El título debe ser texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MaxLength(80, { message: 'El título puede tener hasta 80 caracteres' })
  titulo: string;

  @IsString({ message: 'La descripción debe ser texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @MaxLength(400, { message: 'La descripción puede tener hasta 400 caracteres' })
  descripcion: string;

  @IsMongoId({ message: 'El autor no es válido' })
  autor: string;
}