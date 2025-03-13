import { Module } from '@nestjs/common';
import { HourSessionService } from './hour-session.service';
import { HourSessionController } from './hour-session.controller';

@Module({
  controllers: [HourSessionController],
  providers: [HourSessionService],
})
export class HourSessionModule {}
