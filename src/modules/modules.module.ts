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
import { SupervisorModule } from '@modules/supervisors/supervisor.module';
import { MonitorModule } from '@modules/monitors/monitor.module';
import { TeacherModule } from '@modules/teachers/teacher.module';
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

    SupervisorModule,
    MonitorModule,
    TeacherModule,
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

    SupervisorModule,
    MonitorModule,
    TeacherModule,
  ],
})
export class ModulesModule {}
