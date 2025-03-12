import { Controller, Post, Body, Get } from '@nestjs/common';
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
}