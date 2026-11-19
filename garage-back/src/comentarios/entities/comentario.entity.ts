import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Comentario {
  @Prop({ required: true })
  texto: string;

  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  autor: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Publicacion', required: true })
  publicacion: Types.ObjectId;

  @Prop({ default: Date.now })
  fecha: Date;

  @Prop({ default: false })
  modificado: boolean;

  @Prop({ default: true })
  activo: boolean;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);