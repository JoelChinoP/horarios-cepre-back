import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ClassService } from './class.service';
//import { Prisma } from '@prisma/client';
import { CreateClassDto, UpdateClassDto, ClassDto } from './dto';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  // ─────── CRUD ───────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createClassDto: CreateClassDto): Promise<ClassDto> {
    return this.classService.create(createClassDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<ClassDto[]> {
    return this.classService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<ClassDto> {
    return this.classService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateClassDto,
  ): Promise<ClassDto> {
    return await this.classService.update(id, updateClassDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArea(@Param('id') id: string): Promise<ClassDto> {
    return this.classService.delete(id);
  }
}
