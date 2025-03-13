import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import Database Modules
import { DrizzleModule } from '@modules/db/drizzle/drizzle.module';
import { PrismaModule } from '@modules/db/prisma/prisma.module';
import { SchemaMiddleware } from '@modules/db/prisma/prisma.middleware';

// Modules
import { ModulesModule } from '@modules/modules.module';

import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { SedeModule } from '@modules/infrastructure/sedes/sede.module';
import { ShiftModule } from '@modules/infrastructure/shifts/shift.module';
import { HourSessionModule } from '@modules/schedules/hour-session/hour-session.module';
import { CourseModule } from '@modules/academic/courses/course.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true, // para que no necesites importarlo en cada módulo
    }),
    DrizzleModule,
    ModulesModule,
    UsersModule,
    AuthModule,
    SedeModule,
    ShiftModule,
    HourSessionModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SchemaMiddleware)
      .exclude(
        //{ path: 'health', method: RequestMethod.GET },  // ejemplo 1
        { path: 'roles', method: RequestMethod.ALL }, // ejemplo 2
        { path: 'permissions', method: RequestMethod.ALL }, // ejemplo 3
      )
      .forRoutes('*path');
  }
}
