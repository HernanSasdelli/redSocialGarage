import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsuariosService } from '../usuarios/usuarios.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { LoginDto } from '../usuarios/dto/login.dto';
import * as bcrypt from 'bcrypt';
import {CreateUsuarioDto} from '../usuarios/dto/create-usuario.dto';

@Injectable()
export class AuthService {

    constructor(private usuariosService: UsuariosService) {}

        async registro(createUsuarioDto: CreateUsuarioDto) {
            const usuarioNuevo = await this.usuariosService.create(createUsuarioDto);
            return await this.usuariosService.findOne(usuarioNuevo._id.toString());
        }

        async login(loginDto: LoginDto){
            const usuario = await this.usuariosService.buscarPorCorreo(loginDto.correo);
            if (!usuario) {
                throw new UnauthorizedException('Credenciales invalidas');
            } 

            const coincide = await bcrypt.compare(loginDto.clave, usuario.clave);
            if (!coincide) {
                throw new UnauthorizedException('Credenciales inválidas');
            }

            return await this.usuariosService.findOne(usuario._id.toString());

        }
}
