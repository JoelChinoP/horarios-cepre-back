// prisma-exception.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PrismaExceptionInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        // ✅ No interferir con errores lanzados manualmente (como NotFoundException)
        if (error instanceof HttpException) {
          return throwError(() => error);
        }

        if (error?.name === 'PrismaClientKnownRequestError') {
          const modelName = error.meta?.modelName || 'Record';

          switch (error.code) {
            // Not found errors
            case 'P2022': // Column not found
            case 'P2025': // Record not found
              return throwError(
                () => new NotFoundException(`${modelName} not found`)
              );

            // Unique constraint errors
            case 'P2002': 
              const target = Array.isArray(error.meta?.target) 
                ? error.meta.target.join(', ') 
                : error.meta?.target || 'field';
              return throwError(
                () =>
                  new ConflictException(`The value for '${target}' already exists.`),
              );

            // Foreign key constraint errors
            case 'P2003': 
              const field = error.meta?.field_name || 'field';
              return throwError(
                () =>
                  new BadRequestException(`Related ${field} not found or invalid`),
              );

            default:
              console.error(`Unhandled Prisma error (${error.code}):`, error);
              return throwError(
                () =>
                  new InternalServerErrorException(
                    'Database error occurred, please contact an administrator.',
                  ),
              );
          }
        }

        console.error('Unexpected error:', error);
        return throwError(
          () =>
            new InternalServerErrorException(
              'An unexpected error occurred, please contact an administrator.',
            ),
        );
      }),
    );
  }
}
