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
} from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto, UpdateAreaDto, AreaDto } from './dto';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
//import { ApiResponse } from '@nestjs/swagger';

@Controller('areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  // ─────── CRUD ───────
  @Post()
  @ApiBody({ type: CreateAreaDto })
  @ApiCreatedResponse({
    description: 'The record area been successfully created.',
  })
  @HttpCode(HttpStatus.CREATED)
  createArea(@Body() createAreaDto: CreateAreaDto): Promise<AreaDto> {
    return this.areaService.create(createAreaDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAllAreas(): Promise<AreaDto[]> {
    return this.areaService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOneArea(@Param('id') id: string): Promise<AreaDto> {
    return this.areaService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() updateAreaDto: UpdateAreaDto,
  ): Promise<AreaDto> {
    return await this.areaService.update(+id, updateAreaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArea(@Param('id') id: string): Promise<AreaDto> {
    return this.areaService.delete(+id);
  }
}
