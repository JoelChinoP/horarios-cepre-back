import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';

@Injectable()
export class SedeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSedeDto) {
    return this.prisma.sede.create({ data });
  }

  async findAll() {
    return this.prisma.sede.findMany();
  }

  async findOne(id: number) {
    return this.prisma.sede.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateSedeDto) {
    return this.prisma.sede.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.sede.delete({ where: { id } });
  }
}
