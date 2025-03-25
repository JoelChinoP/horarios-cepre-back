import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Authorization } from '@modules/auth/decorators/authorization.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // GET /users?skip=0&take=10
  @Get()
  @Authorization({
    permission: 'users.list',
    description: 'Obtener todos los usuarios',
  })
  async getUsers(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.userService.users({
      skip,
      take,
    });
  }
}
