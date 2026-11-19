import { Injectable,NotFoundException } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Publicacion } from './entities/publicacion.entity';
import { Model,Types } from 'mongoose';

import { ConsultasService } from '../consultas/consultas.service';
import { ConsultaPublicacionesDto } from './dto/consulta-publicaciones.dto';
import {ForbiddenException} from '@nestjs/common/exceptions/forbidden.exception';

@Injectable()
export class PublicacionesService {

  constructor(@InjectModel(Publicacion.name) private publicacionModel: Model<Publicacion>,
   private consultasService: ConsultasService) {}


  async create(createPublicacionDto: CreatePublicacionDto) {
    return await this.publicacionModel.create(createPublicacionDto);
    ///'This action adds a new publicacione';
  }

  armarFiltro(autor?: string) {
    const filtro: { activo: boolean, autor?: string } = {activo:true};//soo activas 
      if (autor !== undefined) {//y si viene el autor va con autor
        filtro.autor = autor;
    }
    return filtro;
  }



  
  async buscar(consulta: ConsultaPublicacionesDto) {

    //me armo todos los parametros
    const filtro = this.armarFiltro(consulta.autor);
    const orden = this.consultasService.armarOrden(consulta.orden);
    const pagina = this.consultasService.armarPagina(consulta.offset, consulta.limit);

    //y los uso en las publicaciones segun lo que traje
    const publicaciones = await this.publicacionModel
      .find(filtro)
      .sort(orden)
      .skip(pagina.offset)
      .limit(pagina.limit)
      .populate('autor','nombre apellido usuario foto');

    const total = await this.publicacionModel.countDocuments(filtro);

    return {publicaciones:publicaciones, total:total};
  }

  /*async findAll() {
    return await this.publicacionModel
    //.findOne({activo: true}) trae una sola
    .find({activo: true})
    .sort({fecha: -1})
    .populate('autor','nombre apellido usuario foto');
  }*/

  async findOne(id: string) {
     return await this.publicacionModel
    .findById(id)
    
    .populate('autor','nombre apellido usuario foto');
  }

  async buscarActiva(id: string) {
      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('La publicación no existe');
      }
      const publicacion = await this.publicacionModel.findById(id);
      if (!publicacion || !publicacion.activo) {
        throw new NotFoundException('La publicación no existe');//ver de hacer tipo el 404
      }
      return publicacion;
    }

  async guardarMeGusta(id: string, lista: { usuario: Types.ObjectId, fecha: Date }[]) {
    await this.publicacionModel.findByIdAndUpdate(id, {
      meGusta:lista,
      cantidadMeGusta:lista.length,
    });
    return await this.findOne(id);
  }

  //recibo la lista y me fijo si esta
  yaDioMeGusta(lista: { usuario: Types.ObjectId, fecha: Date }[], usuario: string) {
    for (const megusta of lista) {
      if (megusta.usuario.toString() === usuario) {
        return true;
      }
    }
    return false;
  }

  //llega la lista y le saco el me gusta y la devuvelvo 
  quitarMeGusta(lista: { usuario: Types.ObjectId, fecha: Date }[], usuario: string) {
    const nueva: { usuario: Types.ObjectId, fecha: Date }[] = [];
    for (const megusta of lista) {
      if (megusta.usuario.toString() !== usuario) {
        nueva.push(megusta);
      }
    }
    return nueva;
  }

  //sacar y poner me gusta a mongo


  //poner
    async darMeGusta(id: string, usuario: string) {
    const publicacion = await this.buscarActiva(id);
    if (this.yaDioMeGusta(publicacion.meGusta, usuario)) {
      return await this.findOne(id);
    }
    publicacion.meGusta.push({usuario:new Types.ObjectId(usuario), fecha:new Date()});
    return await this.guardarMeGusta(id, publicacion.meGusta);
  }


  //sacar
  async sacarMeGusta(id: string, usuario: string) {
    const publicacion = await this.buscarActiva(id);
    const lista = this.quitarMeGusta(publicacion.meGusta, usuario);
    return await this.guardarMeGusta(id, lista);
  }
  








  update(id: number, updatePublicacionDto: UpdatePublicacionDto) {
    return `This action updates a #${id} publicacione`;
  }

  //dar de baja la publicacion.
  async borrar(id: string, usuario: string) {
    const publicacion = await this.buscarActiva(id);
    if (publicacion.autor.toString() !== usuario) {
      throw new ForbiddenException('No podés borrar una publicación de otro usuario');
    }
    await this.publicacionModel.findByIdAndUpdate(id, {activo:false});
    return {mensaje:'Publicación borrada'};
  }
}
