import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsuariosModule } from '../usuarios/usuarios.module';
import { ArchivosModule } from '../archivos/archivos.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [UsuariosModule, ArchivosModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global:true,
      secret:process.env.JWT_SECRET!,
      signOptions: { expiresIn: '60s' }})
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
