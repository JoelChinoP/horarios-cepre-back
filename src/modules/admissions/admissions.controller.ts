import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AdmissionsService } from './admissions.service';
import { ApiOperation } from '@nestjs/swagger';
import { Unauthenticated } from '@modules/auth/decorators/unauthenticated.decorator';
import { CreateAdmissionDto } from './dto';

@Controller('admissions')
export class AdmissionsController {
  constructor(private readonly service: AdmissionsService) {}

  @Post()
  @Unauthenticated()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear un nuevo proceso de admisión',
    description: 'Create a new process admision',
  })
  async create(@Body() dataCreate: CreateAdmissionDto) {
    return await this.service.create(dataCreate);
  }

  @Get()
  @Unauthenticated()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener todos los procesos de admisión',
    description: 'Get all admission processes',
  })
  async getAll() {
    return await this.service.getAll();
  }
}
