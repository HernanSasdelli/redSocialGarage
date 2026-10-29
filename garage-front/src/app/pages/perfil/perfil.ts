import { Component } from '@angular/core';
import { Publicacion } from '../../modelos/publicacion';
import { CardPublicacion } from '../../componentes/card-publicacion/card-publicacion';

@Component({
  imports: [CardPublicacion],
  selector: 'app-perfil',
  styleUrl: './perfil.css',
  templateUrl: './perfil.html',
})
export class Perfil {

  usuario = {

    nombre : 'Hernan',
    apellido :  'Sasdelli',
    usuario : 'Her9192',
    correo : 'hernan@gmail.com',
    fechaNacimiento:'15/06/1990',
    descripcion : 'Hola',
    foto: 'Piloto.png'

  };

  publicaciones: Publicacion[] = [
    {
      _id: 'p1',
      titulo: '¿Vibración en el Mondeo?',
      descripcion: 'Tiembla todo al ralentí, parece una samba.',
      fecha: '28/10/2026',
      autor: { _id: 'u1', usuario: 'Her9192', foto: 'Piloto.png' },
      meGusta: [{ usuario: 'u2', fecha: '28/10/2026' }],
      comentarios: [
        { _id: 'c1', publicacion: 'p1', autor: { _id: 'u2', usuario: 'MartinP', foto: 'Piloto.png' }, texto: 'Revisá los soportes del motor.', fecha: '28/10/2026' },
      ],
    },
    {
      _id: 'p2',
      titulo: 'Cambio de aceite: ¿por tiempo o kilometraje?',
      descripcion: 'Hago unos 8.000 km al año, casi todo en ciudad.',
      fecha: '20/10/2026',
      autor: { _id: 'u1', usuario: 'Her9192', foto: 'Piloto.png' },
      meGusta: [],
      comentarios: [],
    },
    {
      _id: 'p3',
      titulo: 'Un Clio viaje a Mar del Plata',
      descripcion: 'Fue y volvió sin drama, 6 litros cada 100.',
      imagen: 'fondo.png',
      fecha: '15/10/2026',
      autor: { _id: 'u1', usuario: 'Her9192', foto: 'Piloto.png' },
      meGusta: [{ usuario: 'u2', fecha: '16/10/2026' }, { usuario: 'u3', fecha: '17/10/2026' }],
      comentarios: [],
    },
  ];
}
