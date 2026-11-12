import { Module } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesController } from './publicaciones.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Publicacion, PublicacionSchema } from './entities/publicacion.entity';
import { ArchivosModule } from '../archivos/archivos.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: Publicacion.name, schema: PublicacionSchema }]),ArchivosModule],

  controllers: [PublicacionesController],
  providers: [PublicacionesService],
})
export class PublicacionesModule {}
