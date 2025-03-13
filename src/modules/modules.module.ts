import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AcademicModule } from './academic/academic.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ScheduleModule } from './schedules/schedules.module';

@Module({
  imports: [UsersModule, AcademicModule, InfrastructureModule, ScheduleModule],
  exports: [UsersModule, AcademicModule, InfrastructureModule, ScheduleModule],
})
export class ModulesModule {}
