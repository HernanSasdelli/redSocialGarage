import { Controller, Get, Post, Body, Patch, Param, Delete,UseInterceptors,UploadedFile } from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { ArchivosService } from '../archivos/archivos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { MeGustaDto } from './dto/me-gusta.dto';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService, private archivosService: ArchivosService) {}
/*
  @Post()
  create(@Body() createPublicacioneDto: CreatePublicacionDto) {
    return this.publicacionesService.create(createPublicacioneDto);
  }*/

    //crear publicacion
   @Post()
  @UseInterceptors(FileInterceptor('imagen', {storage:memoryStorage(), limits:{fileSize:5 * 1024 * 1024}}))
  async create(@Body() createPublicacionDto: CreatePublicacionDto, @UploadedFile() imagen: Express.Multer.File) {
    if (imagen) {
      createPublicacionDto.imagen = await this.archivosService.subirImagen(imagen);
    }
    return this.publicacionesService.create(createPublicacionDto);
  }
  //sumar me gusta
    @Post(':id/me-gusta')
  darMeGusta(@Param('id') id: string, @Body() meGustaDto: MeGustaDto) {
    return this.publicacionesService.darMeGusta(id, meGustaDto.usuario);
  }
//restar ,e guista
  @Delete(':id/me-gusta/:usuario')
  sacarMeGusta(@Param('id') id: string, @Param('usuario') usuario: string) {
    return this.publicacionesService.sacarMeGusta(id, usuario);
  }

    
  @Get()
  findAll() {
    return this.publicacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicacionesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicacioneDto: UpdatePublicacionDto) {
    return this.publicacionesService.update(+id, updatePublicacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicacionesService.remove(+id);
  }
}
