import { Module } from '@nestjs/common';
import { AdmissionsController } from './admissions.controller';
import { AdmissionsService } from './admissions.service';
import { DrizzleModule } from '@database/drizzle/drizzle.module';
import { PrismaModule } from '@database/prisma/prisma.module';
import { SchemaManagerModule } from '@database/schema-manager/schema-manager.module';

@Module({
  imports: [DrizzleModule, PrismaModule, SchemaManagerModule],
  controllers: [AdmissionsController],
  providers: [AdmissionsService],
  exports: [AdmissionsService],
})
export class AdmissionsModule {}
