import { Injectable } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Publicacion } from './entities/publicacion.entity';
import { Model } from 'mongoose';



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
    //.sort({fecha: -1})
    .populate('autor','nombre apellido usuario foto');
  }

  update(id: number, updatePublicacionDto: UpdatePublicacionDto) {
    return `This action updates a #${id} publicacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicacione`;
  }
}
