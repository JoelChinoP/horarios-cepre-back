import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthResponseDto } from '@modules/auth/dto/auth-google.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(profile: any): Promise<AuthResponseDto> {
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
    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    return {
      user: {
        id: user.id,
        email: user.email,
        googleId: user.googleId || undefined,
        role: user.role,
      },
      token,
    };
  }
}
