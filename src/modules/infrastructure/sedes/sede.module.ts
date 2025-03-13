import { Module } from '@nestjs/common';
import { PrismaModule } from '../../db/prisma/prisma.module';
import { SedeService } from './sede.service';
import { SedeController } from './sede.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SedeController],
  providers: [SedeService],
})
export class SedeModule {}
