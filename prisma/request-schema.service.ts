import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

interface CustomRequest {
  schema?: string;
}

@Injectable({ scope: Scope.REQUEST })
export class RequestSchemaService {
  private schema: string;

  constructor(@Inject(REQUEST) private readonly request: CustomRequest) {
    this.schema = this.request.schema || 'default';
  }

  getSchema(): string {
    return this.schema;
  }
}
