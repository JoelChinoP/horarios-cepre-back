import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { AreaModule } from './areas/area.module';
import { AreaCourseHourModule } from './area-course-hour/area-course-hour.module';
import { ClassModule } from './classes/class.module';
import { HourSessionModule } from './hour-session/hour-session.module';
import { ScheduleModule } from './schedules/schedules.module';
import { SedeModule } from './sedes/sede.module';
import { ShiftModule } from './shifts/shift.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { CourseModule } from '@modules/courses/course.module';

// Guard de Autorización
import { AuthorizationGuard } from './auth/guards/authorization.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    AuthModule,

    AreaModule,
    AreaCourseHourModule,
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
    AreaCourseHourModule,
    CourseModule,
    ClassModule,
    HourSessionModule,
    ScheduleModule,
    SedeModule,
    ShiftModule,

    RolesModule,
    PermissionsModule,
  ],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class ModulesModule {}
