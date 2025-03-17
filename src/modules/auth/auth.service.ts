import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GoogleAuthDto } from '@modules/auth/dto/auth-google.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateGoogleUser(profile: any): Promise<GoogleAuthDto> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { id, emails } = profile;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const email = emails?.[0]?.value;

    let user = await this.prisma.user.findUnique({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where: { email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          email,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          googleId: id,
          role: 'user', // Puedes asignar un rol por defecto
        },
      });
    }

    return {
      id: user.id,
      email: user.email,
      googleId: user.googleId || undefined,
      role: user.role,
    };
  }
}
