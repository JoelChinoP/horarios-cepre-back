import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../../../drizzle/schema';

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  public db: ReturnType<typeof drizzle>;
  private readonly logger = new Logger(DrizzleService.name);

  constructor() {
    console.log('DB_HOST:', process.env.DB_HOST);

    this.pool = new Pool({
      //connectionString: process.env.DATABASE_URL,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: {
        rejectUnauthorized: false, // Ignora verificación de certificado (opcional según el proveedor)
      },
      idleTimeoutMillis: 30000, // Timeout para conexiones inactivas
      connectionTimeoutMillis: 2000, // Timeout para conexiones nuevas
    });
    this.db = drizzle(this.pool, { schema });

    // Configurar eventos para monitoreo
    this.pool.on('connect', () => {
      this.logger.debug('Drizzle: Nueva conexión establecida');
    });

    this.pool.on('error', (err) => {
      this.logger.error(`Drizzle: Error en pool de conexiones: ${err.message}`);
    });

    this.db = drizzle(this.pool, { schema });
  }

  async onModuleInit() {
    // Conexión establecida en el constructor

    // Verificar conexión
    try {
      await this.pool.query('SELECT 1');
      this.logger.log('Drizzle conectado exitosamente');
    } catch (error) {
      this.logger.error(`No se pudo conectar a la DB: ${error}`);
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
    this.logger.log('Drizzle desconectado exitosamente');
  }
}
