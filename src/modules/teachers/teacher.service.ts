import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { CreateTeacherDto, UpdateTeacherDto, TeacherBaseDto, } from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  // ─────── CRUD ───────
  async create(
    createTeacherDto: CreateTeacherDto,
  ): Promise<TeacherBaseDto> {
    const teacher = await this.prisma.teacher.create({
      data: createTeacherDto,
      include: { user: true, courses: true }, // Incluye la relación con el usuario
    });
    return this.mapToTeacherDto(teacher);
  }

  async findAll(): Promise<TeacherBaseDto[]> {
    const teachers = await this.prisma.teacher.findMany({
      include: { user: true, courses: true }, // Incluye la relación con el usuario
    });
    return teachers.map((teacher) =>
      this.mapToTeacherDto(teacher),
    );
  }

  async findOne(id: string): Promise<TeacherBaseDto> {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
      include: { user: true }, // Incluye la relación con el usuario
    });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return this.mapToTeacherDto(teacher);
  }

  async update(
    id: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherBaseDto> {
    const teacher = await this.prisma.teacher.update({
      where: { id },
      data: updateTeacherDto,
      include: { user: true, courses: true }, // Incluye la relación con el usuario
    });
    return this.mapToTeacherDto(teacher);
  }

  async delete(id: string): Promise<TeacherBaseDto> {
    const teacher = await this.prisma.teacher.delete({
      where: { id },
      include: { user: true, courses: true }, // Incluye la relación con el usuario
    });
    return this.mapToTeacherDto(teacher);
  }

  // ─────── Métodos auxiliares ───────

  private mapToTeacherDto(obj: any): TeacherBaseDto {
    return plainToInstance(TeacherBaseDto, obj);
  }

  //async getTeacherSchedules(teacherId: string) {
  //  return Promise.resolve(undefined);
  //}
}
