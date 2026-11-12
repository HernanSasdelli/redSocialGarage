import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { ArchivosModule } from '../../archivos/archivos.module'; 

export class CreateUsuarioDto {
  @IsString({message:'El nombre tiene que ser texto'})
  @IsNotEmpty({ message: 'El nombre es obligatorio'})
  nombre: string;

  @IsString({message:'El apellido tiene que ser texto'})
  @IsNotEmpty({ message: 'El apellido es obligatorio'})
  apellido: string;

  @IsEmail({}, { message: 'El correo no es válido'})
  correo: string;

  
  @IsNotEmpty({ message: 'El usuario es obligatorio'})
  usuario: string;

  @Matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message: 'La clave debe tener al menos 8 caracteres, una mayúscula y un número',
  })
  clave: string;

  @IsDateString({}, { message: 'La fecha de nacimiento no es válida' })
  fechaNacimiento: string;
  
  @IsOptional()
  @IsString({message:'Agregue una breve descripcion'})
  descripcion?: string;

  @IsOptional()  
  foto?: string;
}