import { Module } from '@nestjs/common';
import { HourSessionService } from './hour-session.service';
import { HourSessionController } from './hour-session.controller';
import { PrismaModule } from '@database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HourSessionController],
  providers: [HourSessionService],
})
export class HourSessionModule {}
