import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { CreateMonitorDto, UpdateMonitorDto, MonitorBaseDto, } from './dto';
import { plainToInstance } from 'class-transformer';
import { ScheduleDto, Weekday } from './dto/schedule.dto';


@Injectable()
export class MonitorService {
  constructor(private prisma: PrismaService) {}

  // ─────── CRUD ───────
  async create(
    createMonitorDto: CreateMonitorDto,
  ): Promise<MonitorBaseDto> {
    const monitor = await this.prisma.monitor.create({
      data: createMonitorDto,
      include: { user: true , supervisors: true }, // Incluye la relación con el usuario
    });
    return this.mapToMonitorDto(monitor);
  }

  async findAll(): Promise<MonitorBaseDto[]> {
    const monitors = await this.prisma.monitor.findMany({
      include: { user: true , supervisors:true }, // Incluye la relación con el usuario
    });
    return monitors.map((monitor) =>
      this.mapToMonitorDto(monitor),
    );
  }

  async findOne(id: string): Promise<MonitorBaseDto> {
    const monitor = await this.prisma.monitor.findUnique({
      where: { id },
      include: { user: true , supervisors: true }, // Incluye la relación con el usuario
    });
    if (!monitor) {
      throw new NotFoundException(`Monitor with ID ${id} not found`);
    }
    return this.mapToMonitorDto(monitor);
  }

  async update(
    id: string,
    updateMonitorDto: UpdateMonitorDto,
  ): Promise<MonitorBaseDto> {
    const monitor = await this.prisma.monitor.update({
      where: { id },
      data: updateMonitorDto,
      include: { user: true, supervisors: true }, // Incluye la relación con el usuario
    });
    return this.mapToMonitorDto(monitor);
  }

  async delete(id: string): Promise<MonitorBaseDto> {
    const monitor = await this.prisma.monitor.delete({
      where: { id },
      include: { user: true, supervisors: true}, // Incluye la relación con el usuario
    });
    return this.mapToMonitorDto(monitor);
  }

  async getSchedule(userId: string): Promise<ScheduleDto[]> {
    const monitor = await this.prisma.monitor.findUnique({
      where: { userId },
      include: {
        classes: {
          include: {
            schedules: {
              include: {
                hourSession: true,
                teacher: {
                  include: {
                    courses: true, // 🔥 Se incluye la relación con Course
                  },
                },
              },
            },
          },
        },
      },
    });
  
    if (!monitor) {
      throw new NotFoundException('Monitor no encontrado');
    }
  
    const classes = Array.isArray(monitor.classes) ? monitor.classes : [monitor.classes];
  
    if (classes.length === 0) {
      return [];
    }
  
    const schedules: ScheduleDto[] = classes.flatMap(clas =>
      clas.schedules?.map(schedule => ({
        weekday: schedule.weekday as Weekday,
        startTime: schedule.hourSession.startTime,
        endTime: schedule.hourSession.endTime,
        courseName: schedule.teacher?.courses?.name || 'Sin asignar', // 🔥 Obtener el nombre del curso
      })) || []
    );
  
    return schedules;
  }
  
  

  // ─────── Métodos auxiliares ───────

  private mapToMonitorDto(obj: any): MonitorBaseDto {
    return plainToInstance(MonitorBaseDto, obj);
  }
}