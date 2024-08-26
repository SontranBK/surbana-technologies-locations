import { Controller, Get, Post,  Put, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('locations')
export class AppController {
  constructor(private readonly locationService: AppService) {}

  @Post()
  async createLocation(@Body('name') name: string, @Body('parentId') parentId?: number): Promise<Location> {
    return await this.locationService.createLocation(name, parentId);
  }

  @Put(':id')
  async updateLocation(@Param('id') id: number, @Body('name') name: string): Promise<Location> {
    return await this.locationService.updateLocation(id, name);
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: number): Promise<void> {
    await this.locationService.deleteLocation(id);
  }

  @Get(':id')
  async getLocationById(@Param('id') id: number): Promise<Location> {
    return await this.locationService.getLocationById(id);
  }

  @Get()
  async getLocationTree(): Promise<Location[]> {
    return await this.locationService.getLocationTree();
  }
}