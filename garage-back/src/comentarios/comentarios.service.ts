import { Injectable, NotFoundException,ForbiddenException } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comentario } from './entities/comentario.entity';
import { ConsultaComentariosDto } from './dto/consulta-comentarios.dto';
import { ConsultasService } from '../consultas/consultas.service';
import { Publicacion } from '../publicaciones/entities/publicacion.entity';//nuevo

@Injectable()
export class ComentariosService {

  constructor(@InjectModel(Comentario.name) private comentarioModel: Model<Comentario>,
    private consultasService: ConsultasService,
    @InjectModel(Publicacion.name) private publicacionModel: Model<Publicacion>) {}//nuevo

  //guardo el comentario y lo devuelvo con el autor para mostrarlo
  async create(createComentarioDto: CreateComentarioDto) {
    const nuevo = await this.comentarioModel.create(createComentarioDto);

    //nuevo, cuento los comentarios activos y lo guardo en la publicacion
    const cantidad = await this.comentarioModel.countDocuments({publicacion:createComentarioDto.publicacion, activo:true});
    await this.publicacionModel.findByIdAndUpdate(createComentarioDto.publicacion, {cantidadComentarios:cantidad});

    return await this.comentarioModel
      .findById(nuevo._id)
      .populate('autor','nombre apellido usuario foto');
  }

  //los de una publicacion, los mas nuevos primero y de a pedazos
  async buscar(consulta: ConsultaComentariosDto) {
    const filtro = {publicacion:consulta.publicacion, activo:true};
    const pagina = this.consultasService.armarPagina(consulta.offset, consulta.limit);

    const comentarios = await this.comentarioModel
      .find(filtro)
      .sort({fecha:-1, _id:-1})
      .skip(pagina.offset)
      .limit(pagina.limit)
      .populate('autor','nombre apellido usuario foto');

    const total = await this.comentarioModel.countDocuments(filtro);

    return {comentarios:comentarios, total:total};
  }

  //solo el autor lo puede editar, y queda marcado como modificado
  async editar(id: string, texto: string, usuario: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('El comentario no existe');
    }
    const comentario = await this.comentarioModel.findById(id);
    if (!comentario || !comentario.activo) {
      throw new NotFoundException('El comentario no existe');
    }
    if (comentario.autor.toString() !== usuario) {
      throw new ForbiddenException('No podés editar un comentario de otro usuario');
    }
    await this.comentarioModel.findByIdAndUpdate(id, {texto:texto, modificado:true});
    return await this.comentarioModel
      .findById(id)
      .populate('autor','nombre apellido usuario foto');
  }
}