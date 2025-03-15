import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
//import { /*Area, AreaCourseHour, Prisma */} from '@prisma/client';

import {
  CreateAreaCourseHourDto,
  UpdateAreaCourseHourDto,
  AreaCourseHourDto,
} from './dto';

@Injectable()
export class AreaCourseHourService {
  constructor(private prisma: PrismaService) {}

  // ─────── CRUD ───────
  async create(
    createAreaCourseHourDto: CreateAreaCourseHourDto,
  ): Promise<AreaCourseHourDto> {
    const area = await this.prisma.areaCourseHour.create({
      data: createAreaCourseHourDto,
    });
    return this.mapToAreaCourseHourDto(area);
  }

  async findAll(): Promise<AreaCourseHourDto[]> {
    const areas = await this.prisma.areaCourseHour.findMany();
    return areas.map((area) => this.mapToAreaCourseHourDto(area));
  }

  async findOne(id: number): Promise<AreaCourseHourDto> {
    const area = await this.prisma.areaCourseHour.findUnique({ where: { id } });
    if (!area) {
      throw new NotFoundException(`Area with ID ${id} not found`);
    }
    return this.mapToAreaCourseHourDto(area);
  }

  async update(
    id: number,
    updateAreaCourseHourDto: UpdateAreaCourseHourDto,
  ): Promise<AreaCourseHourDto> {
    const area = await this.handlePrismaAction(
      () =>
        this.prisma.areaCourseHour.update({
          where: { id },
          data: updateAreaCourseHourDto,
        }),
      id,
    );
    return this.mapToAreaCourseHourDto(area);
  }

  async delete(id: number): Promise<AreaCourseHourDto> {
    const area = await this.handlePrismaAction(
      () =>
        this.prisma.areaCourseHour.delete({
          where: { id },
        }),
      id,
    );
    return this.mapToAreaCourseHourDto(area);
  }

  // ─────── METODOS DE APOYO ───────
  private mapToAreaCourseHourDto(area: any): AreaCourseHourDto {
    return {
      id: area.id,
      areaId: area.areaId,
      courseId: area.courseId,
      totalHours: area.totalHours,
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
        throw new NotFoundException(`Area with ID ${id} not found`);
      }
      throw error;
    }
  }
}
