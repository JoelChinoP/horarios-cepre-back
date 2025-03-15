import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { AreaModule } from './areas/area.module';
import { CourseModule } from './courses/course.module';
import { ClassModule } from './classes/class.module';
import { HourSessionModule } from './hour-session/hour-session.module';
import { ScheduleModule } from './schedules/schedules.module';
import { SedeModule } from './sedes/sede.module';
import { ShiftModule } from './shifts/shift.module';

import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,

    AreaModule,
    CourseModule,
    ClassModule,
    HourSessionModule,
    ScheduleModule,
    SedeModule,
    ShiftModule,

    RolesModule,
    PermissionsModule,
  ],

  exports: [
    UsersModule,
    AuthModule,

    AreaModule,
    CourseModule,
    ClassModule,
    HourSessionModule,
    ScheduleModule,
    SedeModule,
    ShiftModule,

    RolesModule,
    PermissionsModule,
  ],
})
export class ModulesModule {}
