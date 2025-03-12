import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/db/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  // ─────── SCHEDULE CRUD ───────
  createSchedule(data: Prisma.ScheduleCreateInput) {
    return this.prisma.schedule.create({ data });
  }

  findAllSchedules(params: Prisma.ScheduleFindManyArgs = {}) {
    return this.prisma.schedule.findMany(params);
  }

  findOneSchedule(id: number) {
    return this.prisma.schedule.findUnique({ where: { id } });
  }

  updateSchedule(id: number, data: Prisma.ScheduleUpdateInput) {
    return this.prisma.schedule.update({ where: { id }, data });
  }

  deleteSchedule(id: number) {
    return this.prisma.schedule.delete({ where: { id } });
  }
}
