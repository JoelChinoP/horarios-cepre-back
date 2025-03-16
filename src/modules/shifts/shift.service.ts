import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { CreateShiftDto, UpdateShiftDto } from './dto/index';

@Injectable()
export class ShiftService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateShiftDto) {
    try {
      const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual (YYYY-MM-DD)

      return await this.prisma.shift.create({
        data: {
          name: data.name,
          startTime: new Date(`${today}T${data.startTime}Z`).toISOString(),
          endTime: new Date(`${today}T${data.endTime}Z`).toISOString(),
        },
      });
    } catch (error) {
      throw new BadRequestException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        'Error al crear el turno: ' + error.message,
      );
    }
  }

  async findAll() {
    return await this.prisma.shift.findMany();
  }

  async findOne(id: number) {
    const shift = await this.prisma.shift.findUnique({
      where: { id },
    });
    if (!shift) {
      throw new NotFoundException(`Turno con ID ${id} no encontrado.`);
    }
    return shift;
  }

  async update(id: number, data: UpdateShiftDto) {
    try {
      const existingShift = await this.prisma.shift.findUnique({
        where: { id },
      });
      if (!existingShift) {
        throw new NotFoundException(`Turno con ID ${id} no encontrado.`);
      }

      const today = new Date().toISOString().split('T')[0];

      return await this.prisma.shift.update({
        where: { id },
        data: {
          name: data.name ?? existingShift.name,
          startTime: data.startTime
            ? new Date(`${today}T${data.startTime}Z`).toISOString()
            : existingShift.startTime,
          endTime: data.endTime
            ? new Date(`${today}T${data.endTime}Z`).toISOString()
            : existingShift.endTime,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        'Error al actualizar el turno: ' + error.message,
      );
    }
  }

  async remove(id: number) {
    try {
      const shift = await this.prisma.shift.findUnique({ where: { id } });
      if (!shift) {
        throw new NotFoundException(`Turno con ID ${id} no encontrado.`);
      }

      return await this.prisma.shift.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        'Error al eliminar el turno: ' + error.message,
      );
    }
  }
}
