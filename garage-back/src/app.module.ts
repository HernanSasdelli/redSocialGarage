import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { AuthModule } from './auth/auth.module';
import { ArchivosModule } from './archivos/archivos.module';
import { ConsultasModule } from './consultas/consultas.module';
import { ComentariosModule } from './comentarios/comentarios.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI!), UsuariosModule, PublicacionesModule, AuthModule, ArchivosModule, ConsultasModule, ComentariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
