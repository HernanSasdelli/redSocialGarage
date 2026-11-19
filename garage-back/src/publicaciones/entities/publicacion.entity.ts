import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Publicacion {
  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ default: '' })
  imagen: string;

  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  autor: Types.ObjectId;

  @Prop({ default: Date.now })
  fecha: Date;

  @Prop({ default: true })
  activo: boolean;
  @Prop({
    type: [{
      usuario: { type: Types.ObjectId, ref: 'Usuario' },
      fecha: { type: Date, default: Date.now },
    }],
    default: [],
  })
  meGusta: { usuario: Types.ObjectId, fecha: Date }[];

  @Prop({ default: 0 })
  cantidadMeGusta: number;

  @Prop({ default: 0 })
  cantidadComentarios: number;
}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);