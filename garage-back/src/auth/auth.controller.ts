import { Controller, Post, Body, HttpCode, UseInterceptors,UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDto } from '../usuarios/dto/login.dto';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AuthGuard } from '../guards/auth/auth.guard';
import { UseGuards ,Req } from '@nestjs/common';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @HttpCode(200)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }


  @Post('registro')
  @UseInterceptors(FileInterceptor('foto', {storage:memoryStorage(), limits:{fileSize:4 * 1024 * 1024}}))
  registro(@Body() createUsuarioDto: CreateUsuarioDto, 
  @UploadedFile() foto: Express.Multer.File) 
  {
    return this.authService.registro(createUsuarioDto, foto);
  }


  
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('autorizar')
  autorizar(@Req() pedido: any) {
    const id = pedido.user.sub;
    return this.authService.autorizar(id);
  }

 
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('refrescar')
  refrescar(@Req() pedido: any) {
    const datos = pedido.user;
    return this.authService.refrescar(datos.sub, datos.usuario, datos.tipo);
  }

}
