import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
  Inject,
  Scope,
} from '@nestjs/common';
import { SchemaDefaultStore } from './schema-default.store';
import { REQUEST } from '@nestjs/core';
import { PrismaClient, Prisma } from '@prisma/client';
import { REQUEST_SCHEMA_KEY } from './prisma.constants';
import { performance } from 'perf_hooks';
import NodeCache from 'node-cache';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable({ scope: Scope.REQUEST })
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private static clientCache = new NodeCache({
    stdTTL: 3600,
    checkperiod: 300,
    maxKeys: 20,
  });
  private static isShuttingDown = false;
  private schema: string;

  //request any
  constructor(@Inject(REQUEST) private readonly request: Request) {
    super({
      log: [
        { level: 'error', emit: 'stdout' },
        { level: 'warn', emit: 'stdout' },
      ],
    });

    // Obtener schema de la solicitud
    this.schema =
      (this.request[REQUEST_SCHEMA_KEY] as string) ||
      SchemaDefaultStore.getSchema();

    this.logger.debug(`Using schema: ${this.schema}`);
    this.logger.debug(`***********************`);

    // Si ya tenemos el cliente en caché para este schema, usaremos sus métodos
    if (this.schema && SchemaDefaultStore.isValidSchema(this.schema)) {
      this.setupClientProxy();
    } else {
      // Aplicar middleware para métrica en el cliente base
      this.setupQueryMetricsMiddleware(this);
    }

    // Asegurarse que hay un handler de limpieza para el caché (solo una vez)
    if (!PrismaService.clientCache.listeners('del').length) {
      PrismaService.clientCache.on('del', (key, client: PrismaClient) => {
        if (
          !PrismaService.isShuttingDown &&
          client &&
          typeof client.$disconnect === 'function'
        ) {
          client
            .$disconnect()
            .catch((err: any) =>
              this.logger.error(
                `Error disconnecting client for schema ${key}: ${err}`,
              ),
            );
        }
      });
    }
  }

  private setupClientProxy() {
    // Obtener o crear cliente específico para este schema
    const client = this.getClientForCurrentSchema();

    // Proxying de todos los modelos y métodos del cliente
    for (const key of Object.getOwnPropertyNames(
      Object.getPrototypeOf(client),
    )) {
      // Skip the constructor and private methods
      if (key === 'constructor' || key.startsWith('_')) continue;

      if (typeof client[key] === 'function') {
        // Reemplazar métodos con los del cliente específico
        this[key] = (...args: any[]) => client[key](...args);
      }
    }

    // Proxying de modelos
    for (const key of Object.keys(client)) {
      if (
        !key.startsWith('$') &&
        !key.startsWith('_') &&
        typeof client[key] === 'object'
      ) {
        Object.defineProperty(this, key, {
          get: () => client[key],
          configurable: true,
        });
      }
    }
  }

  private setupQueryMetricsMiddleware(client: PrismaClient) {
    // Middleware para logging y métricas
    client.$use(async (params, next) => {
      const start = performance.now();
      const result: unknown = await next(params);
      const end = performance.now();
      const duration = end - start;

      // Log solo consultas lentas para mejor rendimiento
      if (duration > 250) {
        this.logger.warn(
          `[${this.schema || 'default'}] Slow query: ${params.model}.${params.action} - ${duration.toFixed(2)}ms`,
        );
      } else if (process.env.NODE_ENV === 'development') {
        this.logger.debug(
          `[${this.schema || 'default'}] ${params.model}.${params.action} - ${duration.toFixed(2)}ms`,
        );
      }

      return result;
    });
  }

  private getClientForCurrentSchema(): PrismaClient {
    const cacheKey = `schema:${this.schema}`;

    // Verificar el caché
    let client = PrismaService.clientCache.get<PrismaClient>(cacheKey);

    if (!client) {
      // Crear un nuevo cliente solo si no existe en caché
      client = new PrismaClient({
        datasources: {
          db: {
            url: `${process.env.DATABASE_URL}?schema=${this.schema}`,
          },
        },
        log: [
          { level: 'error', emit: 'stdout' },
          { level: 'warn', emit: 'stdout' },
        ],
      });

      // Agregar middleware de métricas
      this.setupQueryMetricsMiddleware(client);

      // Conectar el cliente
      client
        .$connect()
        .catch((err) =>
          this.logger.error(
            `Failed to connect client for schema ${this.schema}: ${err}`,
          ),
        );

      // Almacenar en caché
      PrismaService.clientCache.set(cacheKey, client);
    }

    return client;
  }

  async onModuleInit() {
    // Solo conectamos el cliente base si no estamos usando otro esquema
    if (!this.schema || this.schema === 'public') {
      await this.$connect();
    }
  }

  async onModuleDestroy() {
    // Si estamos usando un cliente de caché, no necesitamos desconectar nada específicamente
    // ya que el manejador de eventos del caché se encargará de ello
    if (!this.schema || this.schema === 'public') {
      await this.$disconnect();
    }
  }

  // Método estático para apagar todos los clientes (se llama desde el módulo principal)
  static async disconnectAll() {
    PrismaService.isShuttingDown = true;

    const disconnectPromises: Promise<void>[] = [];

    // Desconectar todos los clientes en caché
    PrismaService.clientCache.keys().forEach((key) => {
      const client = PrismaService.clientCache.get<PrismaClient>(key);
      if (client && typeof client.$disconnect === 'function') {
        disconnectPromises.push(client.$disconnect());
      }
    });

    return Promise.all(disconnectPromises);
  }

  // Método para transacciones optimizadas
  async executeTransaction<T>(
    fn: (prisma: PrismaClient) => Promise<T>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): Promise<T> {
    return super.$transaction(
      fn,
      options || {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: 'ReadCommitted',
      },
    );
  }
}
