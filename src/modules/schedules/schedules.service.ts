import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { ScheduleBaseDto, CreateScheduleDto, UpdateScheduleDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { LoadScheduleDto } from './dto';
import { CourseDto } from '../courses/dto/course.dto';
import { AreaDto } from '../areas/dto/area.dto';
import { TeacherDto } from '../monitors/dto/teacher.dto';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async loadWithCourses(data: LoadScheduleDto) {
    const client = this.prisma.getClient();
    const courses = await client.course.findMany({ select: { id: true, name: true } });
    const hourSessions = await client.hourSession.findMany({ select: { id: true, period: true } });

    const rawData = await client.$queryRaw<{
      courses: CourseDto[];
      areas: AreaDto[];
      teachers: TeacherDto[];
    }>`
      SELECT 
        (SELECT json_agg(t1)::json FROM courses t1) AS courses,
        (SELECT json_agg(t2)::json FROM areas t2) AS areas,
        (SELECT json_agg(t3)::json FROM teachers t3) AS teachers
    `;

    console.log(rawData.courses);
    console.log(rawData.areas);
    console.log(rawData.teachers);

    const result = {
      courses,
      hourSessions,
    };
    console.log(result);
    return data;
  }

  // ─────── CRUD ───────
  async create(createScheduleDto: CreateScheduleDto): Promise<ScheduleBaseDto> {
    const schedule = await this.prisma.getClient().schedule.create({
      data: createScheduleDto,
      include: { clas: true, hourSession: true, teacher: true },
    });
    return this.mapToScheduleDto(schedule);
  }

  async findAll(): Promise<ScheduleBaseDto[]> {
    const schedule = await this.prisma.getClient().schedule.findMany({
      include: { clas: true, hourSession: true, teacher: true },
    });
    return schedule.map((data) => this.mapToScheduleDto(data));
  }

  async findOne(id: number): Promise<ScheduleBaseDto> {
    const schedule = await this.prisma.getClient().schedule.findUnique({
      where: { id },
      include: { clas: true, hourSession: true, teacher: true },
    });
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
    return this.mapToScheduleDto(schedule);
  }

  async update(
    id: number,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<ScheduleBaseDto> {
    const schedule = await this.prisma.getClient().schedule.update({
      where: { id },
      data: updateScheduleDto,
      include: { clas: true, hourSession: true, teacher: true },
    });
    return this.mapToScheduleDto(schedule);
  }

  async delete(id: number): Promise<ScheduleBaseDto> {
    const schedule = await this.prisma.getClient().schedule.delete({
      where: { id },
      include: { clas: true, hourSession: true, teacher: true },
    });
    return this.mapToScheduleDto(schedule);
  }

  // Metodo para mapear un objeto de tipo Schedule a un objeto de tipo ScheduleDto
  private mapToScheduleDto(obj: any): ScheduleBaseDto {
    return plainToInstance(ScheduleBaseDto, obj);
  }
}
