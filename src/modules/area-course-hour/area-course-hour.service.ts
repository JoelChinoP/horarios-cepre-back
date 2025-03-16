import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
//import { /*Area, AreaCourseHour, Prisma */} from '@prisma/client';

import {
  CreateAreaCourseHourDto,
  UpdateAreaCourseHourDto,
  AreaCourseHourDto,
} from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AreaCourseHourService {
  constructor(private prisma: PrismaService) {}

  // ─────── CRUD ───────
  async create(
    createAreaCourseHourDto: CreateAreaCourseHourDto,
  ): Promise<AreaCourseHourDto> {
    const obj = await this.prisma.areaCourseHour.create({
      data: createAreaCourseHourDto,
    });
    return this.mapToAreaCourseHourDto(obj);
  }

  async findAll(): Promise<AreaCourseHourDto[]> {
    const objs = await this.prisma.areaCourseHour.findMany({
      include: { area: true, course: true },
    });
    return objs.map((data) => this.mapToAreaCourseHourDto(data));
  }

  async findOne(id: number): Promise<AreaCourseHourDto> {
    const obj = await this.prisma.areaCourseHour.findUnique({
      where: { id },
      include: { area: true, course: true },
    });
    if (!obj) {
      throw new NotFoundException(`Area with ID ${id} not found`);
    }
    return this.mapToAreaCourseHourDto(obj);
  }

  async update(
    id: number,
    updateAreaCourseHourDto: UpdateAreaCourseHourDto,
  ): Promise<AreaCourseHourDto> {
    const obj = await this.prisma.areaCourseHour.update({
      where: { id },
      include: { area: true, course: true },
      data: updateAreaCourseHourDto,
    });
    return this.mapToAreaCourseHourDto(obj);
  }

  async delete(id: number): Promise<AreaCourseHourDto> {
    const obj = await this.prisma.areaCourseHour.delete({
      where: { id },
    });
    return this.mapToAreaCourseHourDto(obj);
  }

  // ─────── METODOS DE APOYO ───────
  private mapToAreaCourseHourDto(obj: any): AreaCourseHourDto {
    return plainToInstance(AreaCourseHourDto, obj);
  }
}
