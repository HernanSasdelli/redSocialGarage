import { Injectable } from '@nestjs/common';
import { SortOrder } from 'mongoose';

@Injectable()
export class ConsultasService {

  //como ordenar: por me gusta o por fecha (por defecto)
  armarOrden(orden?: string) {
    let resultado: { [campo: string]: SortOrder } = {fecha:-1, _id:-1};
    if (orden === 'meGusta') {
      resultado = {cantidadMeGusta:-1, fecha:-1, _id:-1};
    }
    return resultado;
  }

  //desde donde y cuantas traer, con valores por defecto
  armarPagina(offset?: number, limit?: number) {
    let desde = 0;
    if (offset !== undefined) {
      desde = offset;
    }
    let cantidad = 10;
    if (limit !== undefined) {
      cantidad = limit;
    }
    return {offset:desde, limit:cantidad};
  }
}