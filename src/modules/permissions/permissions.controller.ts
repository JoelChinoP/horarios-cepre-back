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
import { Authorization } from '@modules/auth/decorators/authorization.decorator';

@Controller('permissions')
@ApiTags('Permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // ─────── CRUD ───────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Authorization({
    permission: 'permission.create',
    description: 'Crear un nuevo permiso',
  })
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
  @Authorization({
    permission: 'permission.list',
    description: 'Listar todos los permisos',
  })
  @ApiOperation({
    summary: 'Obtener todos los permisos',
    description: 'Get all permissions',
  })
  getAll(): Promise<PermissionResponseDto[]> {
    return this.permissionsService.getAll();
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Authorization({
    permission: 'permission.update',
    description: 'Actualizar un permiso',
  })
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
  @Authorization({
    permission: 'permission.delete',
    description: 'Eliminar un permiso',
  })
  @ApiOperation({
    summary: 'Eliminar un permiso',
    description: 'Delete a permission',
  })
  deletePermission(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.delete(id);
  }
}
