import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientFactory } from './prisma-client.factory';
import { RequestSchemaService } from './request-schema.service';

@Injectable()
export class PrismaService {
  constructor(
    private factory: PrismaClientFactory,
    private request: RequestSchemaService,
  ) {}

  get client(): PrismaClient {
    const schema = this.request.getSchema();
    return this.factory.getClient(schema);
  }
}
