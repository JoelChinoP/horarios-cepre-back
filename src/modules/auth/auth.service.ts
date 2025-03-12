import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateGoogleUser(profile: any) {
    const { id, emails } = profile;

    const email = emails?.[0]?.value;

    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          googleId: id,
          role: 'user', // Puedes asignar un rol por defecto
        },
      });
    }

    return user;
  }
}
