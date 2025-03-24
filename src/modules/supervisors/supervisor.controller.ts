import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { CreateSupervisorDto, UpdateSupervisorDto } from './dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  Authorization,
  Role,
} from '@modules/auth/decorators/authorization.decorator';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@Controller('supervisors')
@UseGuards(JwtAuthGuard)
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}

  @Post()
  create(@Body() createSupervisorDto: CreateSupervisorDto) {
    return this.supervisorService.create(createSupervisorDto);
  }

  @Get()
  findAll() {
    return this.supervisorService.findAll();
  }

  @Get('getMonitors')
  @Authorization({
    roles: [Role.SUPERVISOR],
    permission: 'supervisor.getMonitors',
    description: 'Obtiene los monitores de este supervisor',
  })
  @ApiOperation({ summary: 'Obtener los monitores de este supervisor' })
  @ApiResponse({ status: 200, description: 'Monitores obtenidos.' })
  @ApiResponse({ status: 404, description: 'Ta sin monitores.' })
  getMonitors(@Req() req) {
    console.log('Usuario autenticado:', req.user); // Debugging
    const userId = req.user?.userId; // Verifica que exista

    if (!userId) {
      throw new BadRequestException('No se encontró el userId en la solicitud');
    }
    return this.supervisorService.getMonitors(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supervisorService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupervisorDto: UpdateSupervisorDto,
  ) {
    return this.supervisorService.update(id, updateSupervisorDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.supervisorService.delete(id);
  }
}
