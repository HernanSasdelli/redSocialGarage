import { Injectable,NotFoundException } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Publicacion } from './entities/publicacion.entity';
import { Model,Types } from 'mongoose';



@Injectable()
export class PublicacionesService {

  constructor(@InjectModel(Publicacion.name) private publicacionModel: Model<Publicacion>) {}


  async create(createPublicacionDto: CreatePublicacionDto) {
    return await this.publicacionModel.create(createPublicacionDto);
    ///'This action adds a new publicacione';
  }

  async findAll() {
    return await this.publicacionModel
    //.findOne({activo: true}) trae una sola
    .find({activo: true})
    .sort({fecha: -1})
    .populate('autor','nombre apellido usuario foto');
  }

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

  //llega la lista y le saco el me gusta y la devuelvo
  quitarMeGusta(lista: { usuario: Types.ObjectId, fecha: Date }[], usuario: string) {
    const nueva: { usuario: Types.ObjectId, fecha: Date }[] = [];
    for (const megusta of lista) {
      if (megusta.usuario.toString() !== usuario) {
        nueva.push(megusta);
      }
    }
    return nueva;
  }

  //sacar y poner me gusta
    async darMeGusta(id: string, usuario: string) {
    const publicacion = await this.buscarActiva(id);
    if (this.yaDioMeGusta(publicacion.meGusta, usuario)) {
      return await this.findOne(id);
    }
    publicacion.meGusta.push({usuario:new Types.ObjectId(usuario), fecha:new Date()});
    return await this.guardarMeGusta(id, publicacion.meGusta);
  }

  async sacarMeGusta(id: string, usuario: string) {
    const publicacion = await this.buscarActiva(id);
    const lista = this.quitarMeGusta(publicacion.meGusta, usuario);
    return await this.guardarMeGusta(id, lista);
  }
  








  update(id: number, updatePublicacionDto: UpdatePublicacionDto) {
    return `This action updates a #${id} publicacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicacione`;
  }
}
