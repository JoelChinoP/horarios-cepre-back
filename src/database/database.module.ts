import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { SchemaManagerModule } from './schema-manager/schema-manager.module';

@Module({
  imports: [DrizzleModule, PrismaModule, SchemaManagerModule],
  providers: [DrizzleModule, PrismaModule, SchemaManagerModule],
  exports: [DrizzleModule, PrismaModule, SchemaManagerModule],
})
export class DatabaseModule {}
