import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ScheduleDto, CreateScheduleDto, UpdateScheduleDto } from './dto';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  // ─────── CRUD ───────
  async create(createScheduleDto: CreateScheduleDto): Promise<ScheduleDto> {
    const schedule = await this.prisma.schedule.create({
      data: createScheduleDto,
    });
    return this.mapToScheduleDto(schedule);
  }

  async findAll(
    params: Prisma.ScheduleFindManyArgs = {},
  ): Promise<ScheduleDto[]> {
    const schedule = await this.prisma.schedule.findMany(params);
    return schedule.map((data) => this.mapToScheduleDto(data));
  }

  async findOne(id: number): Promise<ScheduleDto> {
    const schedule = await this.prisma.schedule.findUnique({ where: { id } });
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
    return this.mapToScheduleDto(schedule);
  }

  async update(
    id: number,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<ScheduleDto> {
    const clas = await this.handlePrismaAction(
      () =>
        this.prisma.schedule.update({
          where: { id },
          data: updateScheduleDto,
        }),
      id,
    );
    return this.mapToScheduleDto(clas);
  }

  async delete(id: number): Promise<ScheduleDto> {
    const clas = await this.handlePrismaAction(
      () =>
        this.prisma.schedule.delete({
          where: { id },
        }),
      id,
    );
    return this.mapToScheduleDto(clas);
  }

  // Metodo para mapear un objeto de tipo Schedule a un objeto de tipo ScheduleDto
  private mapToScheduleDto(schedule: any): ScheduleDto {
    return {
      id: schedule.id,
      classId: schedule.classId,
      hourSessionId: schedule.hourSessionId,
      teacherId: schedule.teacherId,
      weekday: schedule.weekday,
    };
  }

  private async handlePrismaAction<T>(
    action: () => Promise<T>,
    id: number,
  ): Promise<T> {
    try {
      return await action();
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Class with ID ${id} not found`);
      }
      throw error;
    }
  }
}
