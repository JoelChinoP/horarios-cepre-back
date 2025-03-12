import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { HourSessionService } from './hour-session.service';
import { CreateHourSessionDto } from './dto/create-hour-session.dto';
import { UpdateHourSessionDto } from './dto/update-hour-session.dto';

@Controller('hour-sessions')
export class HourSessionController {
  constructor(private readonly hourSessionService: HourSessionService) {}

  @Post()
  create(@Body() createHourSessionDto: CreateHourSessionDto) {
    return this.hourSessionService.create(createHourSessionDto);
  }

  @Get()
  findAll() {
    return this.hourSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hourSessionService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateHourSessionDto: UpdateHourSessionDto,
  ) {
    return this.hourSessionService.update(+id, updateHourSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hourSessionService.remove(+id);
  }
}
