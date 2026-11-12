import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsuariosModule } from '../usuarios/usuarios.module';
import { ArchivosModule } from '../archivos/archivos.module';

@Module({
  imports: [UsuariosModule, ArchivosModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
