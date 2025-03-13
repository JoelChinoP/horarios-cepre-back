import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, GoogleStrategy, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
