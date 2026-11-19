import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseGuards,Req } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { ConsultaComentariosDto } from './dto/consulta-comentarios.dto';
import { AuthGuard } from '../guards/auth/auth.guard';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}


//Igual que en publicaciones pero conm put
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createComentarioDto: CreateComentarioDto, @Req() pedido: any) {
    createComentarioDto.autor = pedido.user.sub;
    return this.comentariosService.create(createComentarioDto);
  }

  //los de una publicacion: ?publicacion=id&offset=0&limit=5
  @UseGuards(AuthGuard)
  @Get()
  buscar(@Query() consulta: ConsultaComentariosDto) {
    return this.comentariosService.buscar(consulta);
  }

  //editar mi comentario
  @UseGuards(AuthGuard)
  @Put(':id')
  editar(@Param('id') id: string, @Body() updateComentarioDto: UpdateComentarioDto, @Req() pedido: any) {
    const usuario = pedido.user.sub;
    const texto = updateComentarioDto.texto;
    return this.comentariosService.editar(id, texto, usuario);
  }
}