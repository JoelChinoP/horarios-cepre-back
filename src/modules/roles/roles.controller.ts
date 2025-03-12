import { Controller, Post, Body, Get, Param } from '@nestjs/common';
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
}