import { Controller, Get, Post,  Put, Delete, Param, Body } from '@nestjs/common';
import { AppService, LocationResponse } from './app.service';

@Controller('locations')
export class AppController {
  constructor(private readonly locationService: AppService) {}

  @Post()
  async createLocation(@Body() { name, parentId }: { name: string; parentId: number })  {
    return await this.locationService.createLocation(name, parentId);
  }

  @Put(':id')
  async updateLocation(@Param('id') id: number, @Body('name') name: string) {
    return await this.locationService.updateLocation(id, name);
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: number) {
    return await this.locationService.deleteLocation(id);
  }

  @Get()
  getAllLocations() {
    return this.locationService.getAllLocatins();
  }
}