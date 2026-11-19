import { Controller, Get, Post, Body, Patch, Param, Delete,UseInterceptors,UploadedFile,UseGuards, Query,Req } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';

import { ArchivosService } from '../archivos/archivos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { MeGustaDto } from './dto/me-gusta.dto';

import { ConsultaPublicacionesDto } from './dto/consulta-publicaciones.dto';
import { AuthGuard } from '../guards/auth/auth.guard';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService,
     private archivosService: ArchivosService) {}
/*
  @Post()
  create(@Body() createPublicacioneDto: CreatePublicacionDto) {
    return this.publicacionesService.create(createPublicacioneDto);
  }*/

    //crear publicacion
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('imagen', {storage:memoryStorage(), limits:{fileSize:5 * 1024 * 1024}}))
 
  async create(@Body() createPublicacionDto: CreatePublicacionDto, @UploadedFile() imagen: Express.Multer.File,
    @Req() pedido: any) {
    createPublicacionDto.autor = pedido.user.sub;
    if (imagen) {
      createPublicacionDto.imagen = await this.archivosService.subirImagen(imagen);
    }
    return this.publicacionesService.create(createPublicacionDto);
  }


  //sumar me gusta
  @UseGuards(AuthGuard)
  @Post(':id/me-gusta')
  darMeGusta(@Param('id') id: string, @Req() pedido: any) {
    const usuario= pedido.user.sub; //ahora lo saco del token
    return this.publicacionesService.darMeGusta(id, usuario);
  }
//restar me gusta
@UseGuards(AuthGuard)
  @Delete(':id/me-gusta')
  sacarMeGusta(@Param('id') id: string, @Req() pedido: any) {
    const usuario= pedido.user.sub; //ahora lo saco del token
    return this.publicacionesService.sacarMeGusta(id, usuario);
  }

    ///CRUD DE PUBLICACIONES
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() consulta: ConsultaPublicacionesDto) {
    return this.publicacionesService.buscar(consulta);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionesService.findOne(id);
  }



  //borrar mi publicacion
  @UseGuards(AuthGuard)
  @Delete(':id/')
  borrar(@Param('id') id: string,@Req() pedido:any) {
    const usuario = pedido.user.sub;
    return this.publicacionesService.borrar(id, usuario);
  }
}
