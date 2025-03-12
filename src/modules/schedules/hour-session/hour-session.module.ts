import { Module } from '@nestjs/common';
import { PrismaModule } from '../../db/prisma/prisma.module';
import { HourSessionService } from './hour-session.service';
import { HourSessionController } from './hour-session.controller';

@Module({
  imports: [PrismaModule],
  controllers: [HourSessionController],
  providers: [HourSessionService],
})
export class HourSessionModule {}
