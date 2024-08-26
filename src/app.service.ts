import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async createLocation(name: string, parentId?: number): Promise<Location> {
    const location = this.locationRepository.create({ name, parentId });
    return await this.locationRepository.save(location);
  }

  async updateLocation(id: number, name: string): Promise<Location> {
    const location = await this.locationRepository.findOne(id);
    location.name = name;
    return await this.locationRepository.save(location);
  }

  async deleteLocation(id: number): Promise<void> {
    await this.locationRepository.delete(id);
  }

  async getLocationById(id: number): Promise<Location> {
    return await this.locationRepository.findOne(id);
  }

  async getLocationTree(): Promise<Location[]> {
    return await this.locationRepository.findTrees();
  }
}