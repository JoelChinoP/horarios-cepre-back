import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { /*Area, AreaCourseHour,*/ Prisma } from '@prisma/client';

import { CreateAreaDto, UpdateAreaDto, AreaDto } from './dto';

@Injectable()
export class AreaService {
  constructor(private prisma: PrismaService) {}

  // ─────── CRUD ───────
  async create(createAreaDto: CreateAreaDto): Promise<AreaDto> {
    const area = await this.prisma.area.create({
      data: createAreaDto,
    });
    return this.mapToAreaDto(area);
  }

  async findAll(params: Prisma.AreaFindManyArgs = {}): Promise<AreaDto[]> {
    const areas = await this.prisma.area.findMany(params);
    return areas.map((area) => this.mapToAreaDto(area));
  }

  async findOne(id: number): Promise<AreaDto> {
    const area = await this.prisma.area.findUnique({ where: { id } });
    if (!area) {
      throw new NotFoundException(`Area with ID ${id} not found`);
    }
    return this.mapToAreaDto(area);
  }

  async update(id: number, updateAreaDto: UpdateAreaDto): Promise<AreaDto> {
    const area = await this.handlePrismaAction(
      () =>
        this.prisma.area.update({
          where: { id },
          data: updateAreaDto,
        }),
      id,
    );
    return this.mapToAreaDto(area);
  }

  async delete(id: number): Promise<AreaDto> {
    const area = await this.handlePrismaAction(
      () =>
        this.prisma.area.delete({
          where: { id },
        }),
      id,
    );
    return this.mapToAreaDto(area);
  }

  // ─────── METODOS DE APOYO ───────
  private mapToAreaDto(area: any): AreaDto {
    return {
      id: area.id,
      name: area.name,
      description: area.description,
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
