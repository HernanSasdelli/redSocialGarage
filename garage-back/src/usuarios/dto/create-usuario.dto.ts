import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateUsuarioDto {
  @IsString({message:'El correo tiene que ser texto'})
  @IsNotEmpty({ message: 'El nombre es obligatorio'})
  nombre: string;

  @IsString({message:'El correo tiene que ser texto'})
  @IsNotEmpty({ message: 'El apellido es obligatorio'})
  apellido: string;

  @IsEmail({}, { message: 'El correo no es válido'})
  correo: string;

  @IsString({message:'El correo tiene que ser texto'})
  @IsNotEmpty({ message: 'El usuario es obligatorio'})
  usuario: string;

  @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message: 'La clave debe tener al menos 8 caracteres, una mayúscula y un número',
  })
  clave: string;

  @IsDateString({}, { message: 'La fecha de nacimiento no es válida' })
  fechaNacimiento: string;

  @IsOptional()
  @IsString({message:'El correo tiene que ser texto'})
  descripcion?: string;
}