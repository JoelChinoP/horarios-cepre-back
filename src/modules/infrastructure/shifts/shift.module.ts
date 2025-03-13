// src/shift/shift.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../db/prisma/prisma.module';
import { ShiftService } from './shift.service';
import { ShiftController } from './shift.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ShiftController],
  providers: [ShiftService],
  exports: [ShiftService],
})
export class ShiftModule {}
