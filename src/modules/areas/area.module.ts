import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { PrismaModule } from '@database/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService], //para otros modulos
})
export class AreaModule {}
