import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { CreateAreaDto, UpdateAreaDto, AreaBaseDto } from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AreaService {
  constructor(private prisma: PrismaService) {}

  // ─────── CRUD ───────
  async create(createAreaDto: CreateAreaDto): Promise<AreaBaseDto> {
    const obj = await this.prisma.area.create({
      data: createAreaDto,
    });
    return this.mapToAreaDto(obj);
  }

  async findAll(): Promise<AreaBaseDto[]> {
    const objs = await this.prisma.area.findMany();
    console.log(objs);
    return objs.map((obj) => this.mapToAreaDto(obj));
  }

  async findOne(id: number): Promise<AreaBaseDto> {
    const obj = await this.prisma.area.findUnique({ where: { id } });
    if (!obj) {
      throw new NotFoundException(`Area with ID ${id} not found`);
    }
    return this.mapToAreaDto(obj);
  }

  async update(id: number, updateAreaDto: UpdateAreaDto): Promise<AreaBaseDto> {
    const obj = await this.prisma.area.update({
      where: { id },
      data: updateAreaDto,
    });
    return this.mapToAreaDto(obj);
  }

  async delete(id: number): Promise<AreaBaseDto> {
    const obj = await this.prisma.area.delete({
      where: { id },
    });
    return this.mapToAreaDto(obj);
  }

  // ─────── METODOS DE APOYO ───────
  private mapToAreaDto(obj: any): AreaBaseDto {
    return plainToInstance(AreaBaseDto, obj);
  }
}
