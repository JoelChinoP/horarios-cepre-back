import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
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
    return await this.service.getAllRelations();
  }

  @Get('all')
  @Unauthenticated()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener todos los procesos de admisión',
    description: 'Get all admission processes',
  })
  async getAllWithCache() {
    return await this.service.getAllWithCache();
  }

  @Get('current')
  @Unauthenticated()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener el proceso de admisión actual',
    description: 'Get the current admission process',
  })
  async getCurrent() {
    return await this.service.getCurrent();
  }

  @Get(':name')
  @Unauthenticated()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener un proceso de admisión por nombre',
    description: 'Get an admission process by name',
  })
  async getOneWithObservations(@Param('name') name: string) {
    return await this.service.getOneWithObservations(name);
  }
}
