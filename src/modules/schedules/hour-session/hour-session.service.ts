import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { CreateHourSessionDto } from './dto/create-hour-session.dto';
import { UpdateHourSessionDto } from './dto/update-hour-session.dto';

@Injectable()
export class HourSessionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateHourSessionDto) {
    const today = new Date().toISOString().split('T')[0];

    return this.prisma.hourSession.create({
      data: {
        shiftId: data.shiftId,
        period: data.period,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        startTime: `${today}T${data.startTime}.000Z`,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        endTime: `${today}T${data.endTime}.000Z`,
        durationMinutes: data.durationMinutes,
      },
    });
  }

  async findAll() {
    return this.prisma.hourSession.findMany({ include: { shift: true } });
  }

  async findOne(id: number) {
    return this.prisma.hourSession.findUnique({
      where: { id },
      include: { shift: true },
    });
  }

  async update(id: number, data: UpdateHourSessionDto) {
    const today = new Date().toISOString().split('T')[0];
    return this.prisma.hourSession.update({
      where: { id },
      data: {
        shiftId: data.shiftId,
        period: data.period,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        startTime: `${today}T${data.startTime}.000Z`,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        endTime: `${today}T${data.endTime}.000Z`,
        durationMinutes: data.durationMinutes,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.hourSession.delete({ where: { id } });
  }
}
