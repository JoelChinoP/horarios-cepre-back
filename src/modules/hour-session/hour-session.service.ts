import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma/prisma.service';
import { CreateHourSessionDto } from './dto/create-hour-session.dto';
import { UpdateHourSessionDto } from './dto/update-hour-session.dto';

@Injectable()
export class HourSessionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateHourSessionDto) {
    return this.prisma.hourSession.create({ data });
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
    return this.prisma.hourSession.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.hourSession.delete({ where: { id } });
  }
}
