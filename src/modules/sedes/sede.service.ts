import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { CreateSedeDto, UpdateSedeDto } from './dto/index';
@Injectable()
export class SedeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSedeDto) {
    try {
      return await this.prisma.getClient().sede.create({ data });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('Error al crear la sede');
    }
  }

  async findAll() {
    return this.prisma.getClient().sede.findMany();
  }

  async findOne(id: number) {
    const sede = await this.prisma
      .getClient()
      .sede.findUnique({ where: { id } });
    if (!sede) {
      throw new NotFoundException(`Sede con ID ${id} no encontrada`);
    }
    return sede;
  }

  async update(id: number, data: UpdateSedeDto) {
    try {
      return await this.prisma.getClient().sede.update({ where: { id }, data });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException(
        `No se pudo actualizar, sede con ID ${id} no encontrada`,
      );
    }
  }

  async remove(id: number) {
    const sede = await this.prisma
      .getClient()
      .sede.findUnique({ where: { id } });
    if (!sede) {
      throw new NotFoundException(`Sede con ID ${id} no encontrada`);
    }
    return this.prisma.getClient().sede.delete({ where: { id } });
  }
}
