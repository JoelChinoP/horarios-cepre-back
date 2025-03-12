  import {
    Controller,
    Get,
    Query,
    ParseIntPipe,
    DefaultValuePipe,
  } from '@nestjs/common';
  import { UsersService } from './users.service';

  @Controller('users')
  export class UsersController {
    constructor(private readonly userService: UsersService) {}

    // GET /users?skip=0&take=10
    @Get()
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
