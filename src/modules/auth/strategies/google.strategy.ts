import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PrismaService } from '@modules/db/prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private prisma: PrismaService) {
    super({
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
        scope: ['email', 'profile'],
        passReqToCallback: true
    });
  }

  async validate(
    _request: any,
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails } = profile; //const { id, emails, displayName } = profile;
    
    const email = emails[0].value;
    
    // Buscar si el usuario ya existe (por googleId o email)
    let user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { googleId: id },
          { email: email }
        ]
      },
    });
    
    // Si no existe, crear un nuevo usuario
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: email,
          googleId: id,
          role: 'USER', // Asignar un rol predeterminado
          // Crear perfil de usuario básico
          /*userProfile: {
            create: {
              firstName: displayName.split(' ')[0] || '',
              lastName: displayName.split(' ').slice(1).join(' ') || '',
            }
          }*/
        },
      });
    } else if (!user.googleId) {
      // Si el usuario ya existe por email pero no tiene googleId, actualizarlo
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { googleId: id }
      });
    }
    
    // Actualizar el último login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });
    
    done(null, user);
  }
}
