import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './app.entity';
import { FindOneOptions } from 'typeorm';

export interface LocationResponse {
  status: number;
  message: string;
  location?: Location; // Optional, because it won't be present on error
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async createLocation(name: string, parentId?: number): Promise<Location> {
    const location = this.locationRepository.create({ name, parentId });
    return await this.locationRepository.save(location);
  }

  async updateLocation(id: number, name: string): Promise<LocationResponse> {
    
    // Check for invalid ID
    if (id <= 0) {
      const errorMessage = `Invalid ID: ${id}. ID must be a positive number.`;
      console.error(errorMessage);
      return { status: 400, message: errorMessage };
    }
    
    // Check for empty update data
    if (name === undefined) {
      const errorMessage = 'No update data provided.';
      console.error(errorMessage);
      return { status: 400, message: errorMessage };
    }
      
    // Define FindOneOptions to find the location
    const options: FindOneOptions<Location> = {
      where: { id: id } // Use the id to find the location
    };

    // Find the location by id
    const location = await this.locationRepository.findOne(options);

    // Check if location exists
    if (!location) {
      const errorMessage = `Location with id ${id} not found.`;
      console.error(errorMessage);
      return { status: 404, message: errorMessage }; // Not Found
    }

    location.name = name;
    // Save the updated location back to the database
    try {
      await this.locationRepository.save(location);
    } catch (error) {
        console.error('Error saving location:', error);
        return { status: 500, message: 'An error occurred while updating the location.' }; // Internal Server Error
    }

    // Return success message and updated location
    const successMessage = 'Location updated successfully.';
    return { 
      status: 200, 
      message: successMessage, 
      location 
    }; 
  }

  async deleteLocation(id: number): Promise<void> {
    await this.locationRepository.delete(id);
  }

  async getAllLocatins(): Promise<Location[]> {
    return this.locationRepository.find();
  }
}