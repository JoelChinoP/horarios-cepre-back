import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { TeacherService } from './teacher.service';
  import { CreateTeacherDto, UpdateTeacherDto } from './dto';
  
  @Controller('teachers')
  export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}
  
    @Post()
    create(@Body() createTeacherDto: CreateTeacherDto) {
      return this.teacherService.create(createTeacherDto);
    }
  
    @Get()
    findAll() {
      return this.teacherService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.teacherService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
      return this.teacherService.update(id, updateTeacherDto);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.teacherService.delete(id);
    }
  }