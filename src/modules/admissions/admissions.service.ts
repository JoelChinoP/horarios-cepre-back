import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { initialCourses, initialUsers } from 'prisma/data/seed-data-initial';
import { exec } from 'child_process';
import { promisify } from 'util';

@Injectable()
export class AdmissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async runMigrationSchema(newSchema: string) {
    const execAsync = promisify(exec);
    await execAsync('npx prisma migrate deploy');
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
