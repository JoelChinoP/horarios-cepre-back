import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePermissionDto, PermissionResponseDto } from './dto';

@Controller('permissions')
@ApiTags('Permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // ─────── CRUD ───────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear un nuevo permiso',
    description: 'Create a new permission',
  })
  create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionResponseDto> {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener todos los permisos',
    description: 'Get all permissions',
  })
  getAll(): Promise<PermissionResponseDto[]> {
    return this.permissionsService.getAll();
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Actualizar un permiso',
    description: 'Update a permission',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: CreatePermissionDto,
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Eliminar un permiso',
    description: 'Delete a permission',
  })
  deletePermission(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.delete(id);
  }
}
