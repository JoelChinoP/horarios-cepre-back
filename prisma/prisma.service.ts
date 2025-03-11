import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    
    // Usar con precaución - sólo para entornos de prueba
    const models = Reflect.ownKeys(this).filter((key) => {
      return typeof key === 'string' && !key.startsWith('_') && !['$connect', '$disconnect', '$on', '$transaction', '$use'].includes(key as string);
    });

    return Promise.all(
      models.map((modelKey) => {
        return this[modelKey as string].deleteMany();
      }),
    );
  }
}