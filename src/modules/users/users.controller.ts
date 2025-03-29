import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Authorization } from '@modules/auth/decorators/authorization.decorator';
import { CreateUserDto, UserBaseDto } from './dto';

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
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.userService.users({
      skip,
      take,
    });
  }

  @Post()
  @Authorization({
    permission: 'users.create',
    description: 'Crear un nuevo usuario',
  })
  async createUser(data: CreateUserDto): Promise<UserBaseDto> {
    return await this.userService.createUser(data);
  }

  @Post('create-many')
  @Authorization({
    permission: 'users.createMany',
    description: 'Crear muchos usuarios',
  })
  async createManyUsers(data: CreateUserDto[]): Promise<UserBaseDto[]> {
    return await this.userService.createManyUsers(data);
  }
}
