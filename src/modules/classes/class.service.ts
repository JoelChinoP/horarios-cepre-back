import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { /*class, ClassCourseHour,*/ Prisma } from '@prisma/client';

import { CreateClassDto, UpdateClassDto, ClassDto } from './dto';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  // ─────── CRUD ───────
  async create(createClassDto: CreateClassDto): Promise<ClassDto> {
    const clas = await this.prisma.class.create({
      data: createClassDto,
    });
    return this.mapToClassDto(clas);
  }

  async findAll(params: Prisma.ClassFindManyArgs = {}): Promise<ClassDto[]> {
    const classs = await this.prisma.class.findMany(params);
    return classs.map((clas) => this.mapToClassDto(clas));
  }

  async findOne(id: string): Promise<ClassDto> {
    const clas = await this.prisma.class.findUnique({ where: { id } });
    if (!clas) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    return this.mapToClassDto(clas);
  }

  async update(id: string, updateClassDto: UpdateClassDto): Promise<ClassDto> {
    const clas = await this.handlePrismaAction(
      () =>
        this.prisma.class.update({
          where: { id },
          data: updateClassDto,
        }),
      id,
    );
    return this.mapToClassDto(clas);
  }

  async delete(id: string): Promise<ClassDto> {
    const clas = await this.handlePrismaAction(
      () =>
        this.prisma.class.delete({
          where: { id },
        }),
      id,
    );
    return this.mapToClassDto(clas);
  }

  // Metodo para mapear un objeto de tipo Class a un objeto de tipo ClassDto
  private mapToClassDto(clas: any): ClassDto {
    return {
      id: clas.id,
      name: clas.name,
      idSede: clas.idSede,
      areaId: clas.areaId,
      shiftId: clas.shiftId,
      capacity: clas.capacity,
      urlMeet: clas.urlMeet,
    };
  }

  private async handlePrismaAction<T>(
    action: () => Promise<T>,
    id: string,
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
