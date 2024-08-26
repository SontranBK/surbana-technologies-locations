import { Controller, Get, Post,  Put, Delete, Param, Body } from '@nestjs/common';
import { AppService, LocationResponse } from './app.service';

@Controller('locations')
export class AppController {
  constructor(private readonly locationService: AppService) {}

  @Post()
  async createLocation(@Body() { name, building, locationNumber, area, parentId }: 
    { name: string; building: string, locationNumber: string, area: number; parentId: number })  {
    return await this.locationService.createLocation(name, building, locationNumber, area, parentId);
  }

  @Put(':id')
  async updateLocation(@Param('id') id: number, @Body() { name, building, locationNumber, area, parentId }:
  { name: string; building: string, locationNumber: string, area: number; parentId: number }) {
    return await this.locationService.updateLocation(id, name, building, locationNumber, area, parentId);
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: number) {
    return await this.locationService.deleteLocation(id);
  }

  @Get()
  getAllLocations() {
    return this.locationService.getAllLocations();
  }
}