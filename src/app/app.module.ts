import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Import Database Modules
import { DrizzleModule } from '@database/drizzle/drizzle.module';
import { PrismaModule } from '@database/prisma/prisma.module';
import { SchemaMiddleware } from '@database/prisma/prisma.middleware';

// Modules
import { ModulesModule } from '@modules/modules.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true, // para que no necesites importarlo en cada módulo
    }),
    DrizzleModule,
    ModulesModule,
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
