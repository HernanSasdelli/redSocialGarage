import { Controller, Post, Body, HttpCode, UseInterceptors,UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDto } from '../usuarios/dto/login.dto';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @HttpCode(200)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }


  @Post('registro')
  @UseInterceptors(FileInterceptor('foto', {storage:memoryStorage(), limits:{fileSize:5 * 1024 * 1024}}))
  registro(@Body() createUsuarioDto: CreateUsuarioDto, 
  @UploadedFile() foto: Express.Multer.File) 
  {
    return this.authService.registro(createUsuarioDto, foto);
  }

}
