import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
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
      },
    });
  }

  async findAll() {
    return this.prisma.shift.findMany({});
  }

  async findOne(id: number) {
    return this.prisma.shift.findUnique({
      where: { id },
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
      },
    });
  }

  async remove(id: number) {
    return this.prisma.shift.delete({ where: { id } });
  }
}
