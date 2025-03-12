import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma/prisma.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Injectable()
export class ShiftService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateShiftDto) {
    // Format the time strings as a complete ISO datetime
    const today = new Date().toISOString().split('T')[0];

    return this.prisma.shift.create({
      data: {
        name: data.name,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        startTime: `${today}T${data.startTime}.000Z`,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        endTime: `${today}T${data.endTime}.000Z`,
        idSede: data.idSede,
      },
    });
  }

  async findAll() {
    return this.prisma.shift.findMany({ include: { sede: true } });
  }

  async findOne(id: number) {
    return this.prisma.shift.findUnique({
      where: { id },
      include: { sede: true },
    });
  }

  async update(id: number, data: UpdateShiftDto) {
    const today = new Date().toISOString().split('T')[0];
    return this.prisma.shift.update({
      where: { id },
      data: {
        name: data.name,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        startTime: `${today}T${data.startTime}.000Z`,
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        endTime: `${today}T${data.endTime}.000Z`,
        idSede: data.idSede,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.shift.delete({ where: { id } });
  }
}
