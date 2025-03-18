import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { CreateSupervisorDto, UpdateSupervisorDto, SupervisorBaseDto, } from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SupervisorService {
  constructor(private prisma: PrismaService) {}

  // ─────── CRUD ───────
  async create(
    createSupervisorDto: CreateSupervisorDto,
  ): Promise<SupervisorBaseDto> {
    const supervisor = await this.prisma.supervisor.create({
      data: createSupervisorDto,
      include: { users: true }, // Incluye la relación con el usuario
    });
    return this.mapToSupervisorDto(supervisor);
  }

  async findAll(): Promise<SupervisorBaseDto[]> {
    const supervisors = await this.prisma.supervisor.findMany({
      include: { users: true }, // Incluye la relación con el usuario
    });
    return supervisors.map((supervisor) =>
      this.mapToSupervisorDto(supervisor),
    );
  }

  async findOne(id: string): Promise<SupervisorBaseDto> {
    const supervisor = await this.prisma.supervisor.findUnique({
      where: { id },
      include: { users: true }, // Incluye la relación con el usuario
    });
    if (!supervisor) {
      throw new NotFoundException(`Supervisor with ID ${id} not found`);
    }
    return this.mapToSupervisorDto(supervisor);
  }

  async update(
    id: string,
    updateSupervisorDto: UpdateSupervisorDto,
  ): Promise<SupervisorBaseDto> {
    const supervisor = await this.prisma.supervisor.update({
      where: { id },
      data: updateSupervisorDto,
      include: { users: true }, // Incluye la relación con el usuario
    });
    return this.mapToSupervisorDto(supervisor);
  }

  async delete(id: string): Promise<SupervisorBaseDto> {
    const supervisor = await this.prisma.supervisor.delete({
      where: { id },
      include: { users: true }, // Incluye la relación con el usuario
    });
    return this.mapToSupervisorDto(supervisor);
  }

  // ─────── Métodos auxiliares ───────

  private mapToSupervisorDto(obj: any): SupervisorBaseDto {
    return plainToInstance(SupervisorBaseDto, obj);
  }
}