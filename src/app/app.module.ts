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

// Users
import { UsersModule } from '@modules/users/users.module';

// Roles and Permissions
import { RolesModule } from '@modules/roles/roles.module';
import { PermissionsModule } from '@modules/permissions/permissions.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true, // para que no necesites importarlo en cada módulo
    }),
    DrizzleModule,
    UsersModule,
    RolesModule, // Agregar RolesModule
    PermissionsModule, // Agregar PermissionsModule
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