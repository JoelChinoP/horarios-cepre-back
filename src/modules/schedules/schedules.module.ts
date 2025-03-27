import { Module } from '@nestjs/common';
import { ScheduleController } from './schedules.controller';
import { ScheduleService } from './schedules.service';
import { PrismaModule } from '@database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService], //para otros modulos
})
export class ScheduleModule {}
