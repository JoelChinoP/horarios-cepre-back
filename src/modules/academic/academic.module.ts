import { Module } from '@nestjs/common';
import { AcademicController } from './academic.controller';
import { AcademicService } from './academic.service';

@Module({
  controllers: [AcademicController],
  providers: [AcademicService],
  exports: [AcademicService], //para otros modulos
})
export class AcademicModule {}
