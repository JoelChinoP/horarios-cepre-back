import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Req, UseGuards,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import {
  Authorization,
  Role,
} from '@modules/auth/decorators/authorization.decorator';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@Controller('user-profiles')
@UseGuards(JwtAuthGuard)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Authorization({
    description: 'GAA',
    permission: 'userProfile.create',
    roles: [Role.ADMIN],
  })
  @Post()
  create(@Req() req, @Body() createUserProfileDto: CreateUserProfileDto) {
    console.log('Usuario autenticado:', req.user); // Debugging
    const userId = req.user?.userId; // Verifica que exista

    if (!userId) {
      throw new BadRequestException('No se encontró el userId en la solicitud');
    }

    return this.userProfileService.create(userId, createUserProfileDto);
  }

  @Get()
  @Authorization({
    description: 'GAA',
    permission: 'userProfile.list',
    roles: [Role.ADMIN],
  })
  findAll() {
    return this.userProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProfileService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return this.userProfileService.update(id, updateUserProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProfileService.remove(id);
  }

  @Patch(':id/deactivate')
  async deactivateUserProfile(@Param('id') id: string) {
    return this.userProfileService.deactivate(id);
  }
}
