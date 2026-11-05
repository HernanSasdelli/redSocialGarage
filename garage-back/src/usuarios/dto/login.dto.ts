import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {

    
  @IsString()
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  correo: string;

  @IsString()
  @IsNotEmpty({ message: 'La clave es obligatoria' })
  clave: string;
}