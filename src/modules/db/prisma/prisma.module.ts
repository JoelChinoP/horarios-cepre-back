import { Module, Global, DynamicModule } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PRISMA_OPTIONS, PRISMA_MAX_CLIENTS } from './prisma.constants';

export interface PrismaModuleOptions {
  isGlobal?: boolean;
  maxClients?: number; // Límite de clientes en caché
  logQueries?: boolean; // Activar log de consultas
  logSlowQueries?: boolean; // Activar log solo de consultas lentas
  slowQueryThreshold?: number; // Umbral para considerar una consulta como lenta (ms)
}

@Global()
@Module({})
export class PrismaModule {
  static forRoot(options: PrismaModuleOptions = {}): DynamicModule {
    const providers = [
      {
        provide: PRISMA_OPTIONS,
        useValue: {
          logQueries:
            options.logQueries ?? process.env.NODE_ENV === 'development',
          logSlowQueries: options.logSlowQueries ?? true,
          slowQueryThreshold: options.slowQueryThreshold ?? 250,
        },
      },
      {
        provide: PRISMA_MAX_CLIENTS,
        useValue: options.maxClients ?? 20,
      },
      PrismaService,
    ];

    return {
      module: PrismaModule,
      global: options.isGlobal !== false,
      providers,
      exports: [PrismaService],
    };
  }
}
