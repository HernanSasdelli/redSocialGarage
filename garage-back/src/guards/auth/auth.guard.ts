import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  //cada vez que voy a una ruta nueva reviso el token
  async canActivate(context: ExecutionContext) {
    const pedido = context.switchToHttp().getRequest();
    const token = this.sacarToken(context);
    if (!token) {
      throw new UnauthorizedException('Falta el token');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      pedido.user = payload; //anto quien es en el pedido, para que el controller sapa quien es
                              // sin preguntarle al front
      return true;
    } catch (e) {
      throw new UnauthorizedException('Token vencido o invalido');
    }
  } 


  //? si no vino el header explota con 500
  
//devuelve un token o un null..
  sacarToken(context: ExecutionContext) {
    const token = context.switchToHttp().getRequest().headers['authorization']?.split(' ')[1];
    return token || null;
  }
}
