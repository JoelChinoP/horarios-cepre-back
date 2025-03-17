import { Module } from '@nestjs/common';
import { ScheduleController } from './schedules.controller';
import { ScheduleService } from './schedules.service';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService], //para otros modulos
})
export class ScheduleModule {}
