import { Module } from '@nestjs/common';
import { AdmissionsController } from './admissions.controller';
import { AdmissionsService } from './admissions.service';
import { DrizzleModule } from '@database/drizzle/drizzle.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [DrizzleModule, CacheModule.register()],
  controllers: [AdmissionsController],
  providers: [AdmissionsService],
  exports: [AdmissionsService],
})
export class AdmissionsModule {}
