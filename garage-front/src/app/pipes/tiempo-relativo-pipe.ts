import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempoRelativo',
})
export class TiempoRelativoPipe implements PipeTransform {

  //recibe la fecha y devuelve hace cuanto fue
  transform(fecha: string) {
    const ahora = Date.now();
    const cuando = new Date(fecha).getTime();

    const minutos = Math.floor((ahora - cuando) / 60000);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (minutos < 1) {
      return 'hace un momento';
    }
    if (minutos < 60) {
      if (minutos === 1) {
        return 'hace 1 minuto';
      }
      return 'hace ' + minutos + ' minutos';
    }
    if (horas < 24) {
      if (horas === 1) {
        return 'hace 1 hora';
      }
      return 'hace ' + horas + ' horas';
    }
    if (dias <= 7) {
      if (dias === 1) {
        return 'hace 1 día';
      }
      return 'hace ' + dias + ' días';
    }
    //si paso mas de una semana muestro la fecha
    return new Date(fecha).toLocaleDateString('es-AR');
  }
}
