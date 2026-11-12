import { Injectable, UnauthorizedException,ConflictException } from '@nestjs/common';

import { UsuariosService } from '../usuarios/usuarios.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { LoginDto } from '../usuarios/dto/login.dto';
import * as bcrypt from 'bcrypt';
import {CreateUsuarioDto} from '../usuarios/dto/create-usuario.dto';
import { ArchivosService } from '../archivos/archivos.service';

@Injectable()
export class AuthService {

    constructor(private usuariosService: UsuariosService, private archivosService: ArchivosService) {}

        async registro(createUsuarioDto: CreateUsuarioDto, foto?: Express.Multer.File) {
            const correoExiste = await this.usuariosService.buscarPorCorreo(createUsuarioDto.correo);
            if (correoExiste) {
            throw new ConflictException('El correo ya está en uso');//ya tiene seteado el 409
            }
            const usuarioExiste = await this.usuariosService.buscarPorUsuario(createUsuarioDto.usuario);
            if (usuarioExiste) {
            throw new ConflictException('El nombre de usuario ya está en uso');
            }

            if (foto) {
                createUsuarioDto.foto = await this.archivosService.subirImagen(foto);
            }   
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
