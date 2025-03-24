import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'default_secret'),

    });
  }

  async validate(payload: any) {
    console.log('Payload del JWT:', payload);
    return {
      userId: payload.id, // o payload.sub, depende cómo lo generes
      role: payload.role,
      email: payload.email, // opcional
    };
  }
}
