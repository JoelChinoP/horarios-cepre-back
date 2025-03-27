import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createUserProfileDto: CreateUserProfileDto) {
    // Verificar si el usuario existe antes de crear el perfil
    const userExists = await this.prisma.getClient().user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.prisma.getClient().userProfile.create({
      data: {
        userId,
        ...createUserProfileDto,
      },
    });
  }

  async findAll() {
    return this.prisma.getClient().userProfile.findMany({
      where: { isActive: true },
    });
  }

  async findOne(id: string) {
    const userProfile = await this.prisma.getClient().userProfile.findUnique({
      where: { id },
    });
    if (!userProfile)
      throw new NotFoundException('Perfil de usuario no encontrado');
    return userProfile;
  }

  async update(id: string, data: UpdateUserProfileDto) {
    return this.prisma.getClient().userProfile.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.getClient().userProfile.delete({ where: { id } });
  }

  async deactivate(id: string) {
    const profile = await this.prisma
      .getClient()
      .userProfile.findUnique({ where: { id } });

    if (!profile) {
      throw new NotFoundException('User profile not found');
    }

    return this.prisma.getClient().userProfile.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
