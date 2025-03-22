import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { DrizzleService } from '@database/drizzle/drizzle.service';
import { initialCourses, initialUsers } from 'prisma/data/seed-data-initial';
import { AdmissionBaseDto, AdmissionDto, CreateAdmissionDto } from './dto';
import { admissionProcesses } from 'drizzle/schema';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AdmissionsService {
  constructor(
    private prisma: PrismaService,
    private drizzle: DrizzleService,
  ) {}

  async create(dataCreate: CreateAdmissionDto) {
    dataCreate.name = dataCreate.name.replace(/\s/g, '_').toLowerCase();
    const obj = await this.drizzle.db
      .insert(admissionProcesses)
      .values(dataCreate)
      .returning();
    return plainToInstance(AdmissionDto, obj);
  }

  async getAll() {
    const obj = await this.drizzle.db.select().from(admissionProcesses);
    return obj.map((item) =>
      plainToInstance(AdmissionBaseDto, item, {
        excludePrefixes: ['id', 'description'],
      }),
    );
  }

  async runMigrationSchema(dataCreate: CreateAdmissionDto) {
    const obj = await this.create(dataCreate);
    console.log(obj);
    // añadir logica del esquema
    await this.seedInitialData();
  }
  private async seedInitialData() {
    return await this.prisma.$transaction([
      this.prisma.course.createMany({
        data: initialCourses,
      }),
      this.prisma.user.createMany({
        data: initialUsers,
      }),
    ]);
  }
}
