import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
@Module({
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService], //para otros modulos
})
export class AreaModule {}
