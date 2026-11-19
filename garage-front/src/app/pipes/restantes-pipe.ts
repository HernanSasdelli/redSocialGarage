import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'restantes',
})
export class RestantesPipe implements PipeTransform {

  //recibe el texto y el maximo, devuelve cuantos caracteres quedan
  transform(texto: string | null | undefined, maximo: number) {
    if (!texto) {
      return maximo;
    }
    return maximo - texto.length;
  }
}