import { Controller, Post, Body, Get, Put, Param, Delete} from '@nestjs/common';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  createPermission(@Body('name') name: string, @Body('description') description?: string) {
    return this.permissionsService.createPermission(name, description);
  }

  @Get()
  getAllPermissions() {
    return this.permissionsService.getAllPermissions();
  }

  @Put(':id')
  updatePermission(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('description') description?: string,
  ) {
  return this.permissionsService.updatePermission(id, name, description);
  }

  @Delete(':id')
  deletePermission(@Param('id') id: number) {
  return this.permissionsService.deletePermission(id);
}
}