import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDto } from '../usuarios/dto/login.dto';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @HttpCode(200)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('registro')
  registro(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.registro(createUsuarioDto);
  }

}
