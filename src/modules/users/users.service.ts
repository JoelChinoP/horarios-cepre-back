import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma/prisma.service';
import { UserBaseDto } from './dto';
import { CreateUserDto } from './dto/index';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async users(params: {
    skip?: number;
    take?: number;
  }): Promise<UserBaseDto[]> {
    const { skip, take } = params;
    const users = await this.prisma.getClient().user.findMany({
      skip,
      take,
    });
    return users.map((user) =>
      plainToInstance(
        UserBaseDto,
        {
          ...user,
          lastLogin: user.lastLogin ?? undefined,
        },
        {
          excludePrefixes: ['password', 'googleId', 'updatedAt', 'lastLogin'],
        },
      ),
    );
  }

  async createUser(obj: CreateUserDto): Promise<UserBaseDto> {
    const user = await this.prisma.getClient().user.create({
      data: obj,
    });
    return plainToInstance(UserBaseDto, user, {
      excludePrefixes: ['password', 'googleId'],
    });
  }

  async createManyUsers(
    CreateUserDto: CreateUserDto[],
  ): Promise<UserBaseDto[]> {
    await this.prisma.getClient().user.createMany({
      data: CreateUserDto,
    });
    const users = await this.prisma.getClient().user.findMany({
      where: {
        OR: CreateUserDto.map((user) => ({ email: user.email })),
      },
    });
    return plainToInstance(UserBaseDto, users, {
      excludePrefixes: ['password', 'googleId', 'updatedAt', 'lastLogin'],
    });
  }
}
