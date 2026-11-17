import { Module } from '@nestjs/common';
import { ConsultasService } from './consultas.service';

@Module({
  providers: [ConsultasService],
  exports: [ConsultasService]
})
export class ConsultasModule {}
