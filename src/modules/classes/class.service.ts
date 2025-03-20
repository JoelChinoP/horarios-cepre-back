import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';

import {
  CreateClassDto,
  UpdateClassDto,
  ClassBaseDto,
  ClassForTeacherDto,
} from './dto';
import { plainToInstance } from 'class-transformer';
import { ScheduleForTeacherDto } from '@modules/schedules/dto';
import { HourSessionForTeacherDto } from '@modules/hour-session/dto';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  // ─────── CRUD ───────
  async create(createClassDto: CreateClassDto): Promise<ClassBaseDto> {
    const obj = await this.prisma.class.create({
      data: createClassDto,
      include: { sede: true, area: true, shift: true, monitor: true },
    });
    return this.mapToClassDto(obj);
  }

  async findAll(): Promise<ClassBaseDto[]> {
    const classs = await this.prisma.class.findMany({
      include: { sede: true, area: true, shift: true, monitor: true },
    });
    return classs.map((clas) => this.mapToClassDto(clas));
  }

  async findOne(id: string): Promise<ClassBaseDto> {
    const obj = await this.prisma.class.findUnique({
      where: { id },
      include: { sede: true, area: true, shift: true, monitor: true },
    });
    if (!obj) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    return this.mapToClassDto(obj);
  }

  async update(
    id: string,
    updateClassDto: UpdateClassDto,
  ): Promise<ClassBaseDto> {
    const obj = await this.prisma.class.update({
      where: { id },
      data: updateClassDto,
      include: { sede: true, area: true, shift: true, monitor: true },
    });
    return this.mapToClassDto(obj);
  }

  async delete(id: string): Promise<ClassBaseDto> {
    const obj = await this.prisma.class.delete({
      where: { id },
      include: { sede: true, area: true, shift: true, monitor: true },
    });
    return this.mapToClassDto(obj);
  }

  // Metodo para mapear un objeto de tipo Class a un objeto de tipo ClassDto
  private mapToClassDto(obj: any): ClassBaseDto {
    return plainToInstance(ClassBaseDto, obj);
  }

  async findAllTest(): Promise<ClassForTeacherDto[]> {
    const classs = await this.prisma.class.findMany({
      include: {
        area: true,
        shift: true,
        monitor: true,
        schedules: { include: { hourSession: true } },
      },
    });

    console.log('Datos obtenidos de la BD:', classs); // Debugging

    return classs.map((clas) => {
      return plainToInstance(
        ClassForTeacherDto,
        {
          ...clas,
          schedules: clas.schedules
            ? clas.schedules.map((s) =>
                plainToInstance(
                  ScheduleForTeacherDto,
                  {
                    ...s,
                    hourSession: s.hourSession
                      ? plainToInstance(
                          HourSessionForTeacherDto,
                          s.hourSession,
                          { excludeExtraneousValues: true },
                        )
                      : null,
                  },
                  { excludeExtraneousValues: true },
                ),
              )
            : [],
        },
        { excludeExtraneousValues: true },
      );
    });
  }
}
