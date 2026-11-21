import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fotoPerfil',
})
export class FotoPerfilPipe implements PipeTransform {

  //si el usuario no tiene foto va la del piloto
  transform(foto: string | null | undefined) {
    
    if (!foto) {
      return 'Piloto.png';
    }
    return foto;
  }
}
