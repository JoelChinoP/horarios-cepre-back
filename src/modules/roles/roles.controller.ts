import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body('name') name: string, @Body('description') description?: string) {
    return this.rolesService.createRole(name, description);
  }

  @Post(':roleId/assign-permission/:permissionId')
  assignPermissionToRole(
    @Param('roleId') roleId: number,
    @Param('permissionId') permissionId: number,
  ) {
    return this.rolesService.assignPermissionToRole(roleId, permissionId);
  }

  @Get(':roleId/permissions')
  getRolePermissions(@Param('roleId') roleId: number) {
    return this.rolesService.getRolePermissions(roleId);
  }

  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @Put(':id')
  updateRole(
  @Param('id') id: number,
    @Body('name') name: string,
    @Body('description') description?: string,
  ) {
    return this.rolesService.updateRole(id, name, description);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: number) {
    return this.rolesService.deleteRole(id);
  }

  @Delete(':roleId/remove-permission/:permissionId')
  removePermissionFromRole(
    @Param('roleId') roleId: number,
    @Param('permissionId') permissionId: number,
  ) {
    return this.rolesService.removePermissionFromRole(roleId, permissionId);
  }
}