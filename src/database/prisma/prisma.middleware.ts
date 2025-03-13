import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request, NextFunction, Response } from 'express';
import { SchemaDefaultStore } from './schema-default.store'; // Singleton
import { REQUEST_SCHEMA_KEY } from './prisma.constants';

@Injectable()
export class SchemaMiddleware implements NestMiddleware {
  private readonly logger = new Logger(SchemaMiddleware.name);

  use(req: Request, _res: Response, next: NextFunction) {
    const schemaHeader = req.headers['x-schema'];
    const schema =
      typeof schemaHeader === 'string'
        ? schemaHeader
        : SchemaDefaultStore.getSchema();

    console.log('schema:', schema);

    // Validación de esquema
    if (!SchemaDefaultStore.isValidSchema(schema)) {
      this.logger.warn(`Invalid x-schema header: ${schema}`);
      throw new BadRequestException('Invalid schema format');
    }

    // Almacenar el esquema en el objeto request
    req[REQUEST_SCHEMA_KEY] = schema;
    // Para debugging solo en desarrollo
    if (process.env.NODE_ENV === 'development') {
      this.logger.debug(`Using schema: ${schema}`);
    }

    // ✅ IMPORTANTE
    next();
  }
}
