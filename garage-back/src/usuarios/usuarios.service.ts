import { Injectable,UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';


import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class UsuariosService {

  ///REGISTRO
                                                                                                     
  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    
    const claveHash =  await bcrypt.hash( createUsuarioDto.clave , 10 );
    //spread  
    return await this.usuarioModel.create({ ...createUsuarioDto, clave: claveHash });
  }

  async findAll() {
    return await this.usuarioModel.find();
  }

  async findOne(id: string) {
    return await this.usuarioModel.findById(id);
  }
  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  ///LOGIN
  async login(loginDto: LoginDto) {
  const usuario = await this.usuarioModel.findOne({ correo: loginDto.correo });
  if (!usuario) {
    throw new UnauthorizedException('Credenciales inválidas');
  }


  const coincide = await bcrypt.compare(loginDto.clave, usuario.clave);
  if (!coincide) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  const { clave, ...usuarioSinClave } = usuario.toObject();
  return usuarioSinClave;
}
  





}
