import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';
import { SyncAuthorizationService } from './sync-authorization.service';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [JwtModule.register({}), DiscoveryModule],
  providers: [
    AuthService,
    GoogleStrategy,
    PrismaService,
    SyncAuthorizationService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
