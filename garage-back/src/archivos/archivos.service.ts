import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';


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
            reject(new InternalServerErrorException('No se pudo subir la imagen'));
            return;
          }
          resolve(resultado.secure_url);
        },
      );
        subida.on('error', () => reject(new InternalServerErrorException('No se pudo subir la imagen')));
        subida.end(archivo.buffer);
    });
  }
}