import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdmissionsService } from '@modules/admissions/admissions.service';
@Injectable()
export class SchemaInterceptor implements NestInterceptor {
  constructor(private readonly admctx: AdmissionsService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    // Get the request object
    const request = context.switchToHttp().getRequest();
    let schema = request.headers['x-schema'] as string;

    if (schema) {
      const schemas = await this.admctx.getAllWithCache();
      schema = schemas.find((s) => s.name === schema)?.name || 'default';
    } else {
      schema = 'default';
    }

    request.schema = schema;
    return next.handle();
  }
}
