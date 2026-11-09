import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {

    
  @IsString({message:'El correo tiene que ser texto'})
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  correo: string;

  @IsString({message:'El correo tiene que ser texto'})
  @IsNotEmpty({ message: 'La clave es obligatoria' })
  clave: string;
}