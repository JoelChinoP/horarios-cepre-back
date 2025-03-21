import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { PrismaModule } from '../../../prisma/prisma.module';
import { SyncAuthorizationService } from './sync-authorization.service';
import { DiscoveryModule } from '@nestjs/core';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    DiscoveryModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // 👈 Registra la estrategia 'jwt'
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    SyncAuthorizationService,
    PrismaService,
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
