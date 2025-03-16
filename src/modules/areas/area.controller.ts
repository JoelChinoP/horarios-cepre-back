import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto, UpdateAreaDto, AreaDto } from './dto';
import { ApiOperation } from '@nestjs/swagger';
import { PrismaExceptionInterceptor } from '@database/prisma/prisma-exception.interceptor';
//import { ApiCreatedResponse } from '@nestjs/swagger';
//import { ApiResponse } from '@nestjs/swagger';

@Controller('areas')
@UseInterceptors(PrismaExceptionInterceptor)
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  // ─────── CRUD ───────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'Create a new area' })
  create(@Body() createAreaDto: CreateAreaDto): Promise<AreaDto> {
    return this.areaService.create(createAreaDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Get all areas' })
  findAll(): Promise<AreaDto[]> {
    return this.areaService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Get an area by id' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<AreaDto> {
    return this.areaService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Update an area by id' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAreaDto: UpdateAreaDto,
  ): Promise<AreaDto> {
    return await this.areaService.update(id, updateAreaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ description: 'Delete an area by id' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<AreaDto> {
    return this.areaService.delete(id);
  }
}
