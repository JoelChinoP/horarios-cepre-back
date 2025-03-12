import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCourseDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return this.prisma.course.create({ data });
  }

  async findAll() {
    return this.prisma.course.findMany();
  }

  async findOne(id: number) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateCourseDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return this.prisma.course.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.course.delete({ where: { id } });
  }
}
