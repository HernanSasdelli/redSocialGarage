import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Express } from 'express';

@Injectable()
export class ArchivosService {

  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  //Sube la imagen a cloudinary y devuelve la url
  subirImagen(archivo: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const subida = cloudinary.uploader.upload_stream(
        {folder:'garage', resource_type:'image'},
        (error, resultado) => {
          if (error || !resultado) {
            reject(error);
            return;
          }
          resolve(resultado.secure_url);
        },
      );
      subida.on('error', (error) => reject(error));
      subida.end(archivo.buffer);
    });
  }
}