import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './app.entity';
import { FindOneOptions } from 'typeorm';

export interface LocationResponse {
  status: number;
  message: string;
  location?: Location; // Optional, because it won't be present on error
  locations?: Location[];
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async createLocation(name: string, building: string, locationNumber: string, area: number, parentId?: number): Promise<LocationResponse> {

    // Check for empty update data
    if (name === undefined 
      || building === undefined
      || area === undefined
      || parentId === undefined
      || locationNumber === undefined) {
      const errorMessage = 'Missing required fields: building, name, locationNumber, area, parentId are required.';
      console.error(errorMessage);
      return { status: 400, message: errorMessage };
    }

    // Validate data types
    if (typeof name !== 'string' || typeof building !== 'string' || typeof locationNumber !== 'string') {
      const errorMessage = 'Invalid data type for name, or building, or locationNumber. It must be a string.';
      console.error(errorMessage);
      return { status: 400, message: errorMessage }; // Bad Request
    }
    if (typeof parentId !== 'number' || typeof area !== 'number') {
        const errorMessage = 'Invalid data type for area, or parentId. They must be numbers.';
        console.error(errorMessage);
        return { status: 400, message: errorMessage }; // Bad Request
    }

    // Create a new location instance
    const location = this.locationRepository.create({ building, name, locationNumber, area, parentId });
    try {
      await this.locationRepository.save(location);
    } catch (error) {
      console.error('Error saving location:', error);
      return { status: 500, message: 'An error occurred while creating the location.' }; // Internal Server Error
    }

    return { status: 201, message: 'Location created successfully.', location: location }; // Created
  }

  async updateLocation(
    id: number, 
    name: string, 
    building: string, 
    locationNumber: string, 
    area: number, 
    parentId?: number
  ): Promise<LocationResponse> {
    
    // Check for invalid ID
    if (id <= 0) {
      const errorMessage = `Invalid ID: ${id}. ID must be a positive number.`;
      console.error(errorMessage);
      return { status: 400, message: errorMessage };
    }
    
    // Check for empty update data
    if (name === undefined || building === undefined || locationNumber === undefined || area === undefined || parentId === undefined) {
      const errorMessage = 'Missing update data, requied: building, name, locationNumber, area, parentId';
      console.error(errorMessage);
      return { status: 400, message: errorMessage };
    }

    // Validate data types
    if (typeof name !== 'string' || typeof building !== 'string' || typeof locationNumber !== 'string') {
      const errorMessage = 'Invalid data type for name, or building, or locationNumber. It must be a string.';
      console.error(errorMessage);
      return { status: 400, message: errorMessage }; // Bad Request
    }
    if (typeof parentId !== 'number' || typeof area !== 'number') {
        const errorMessage = 'Invalid data type for area, or parentId. They must be numbers.';
        console.error(errorMessage);
        return { status: 400, message: errorMessage }; // Bad Request
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

    // Update the location object
    if (name) location.name = name;
    if (building) location.building = building;
    if (locationNumber) location.locationNumber = locationNumber;
    if (area) location.area = area;
    if (parentId) location.parentId = parentId;

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

  async deleteLocation(id: number): Promise<LocationResponse> {

    // Check for invalid ID
    if (id <= 0) {
      const errorMessage = `Invalid ID: ${id}. ID must be a positive number.`;
      console.error(errorMessage);
      return { status: 400, message: errorMessage };
    }

    try {
      let deleteRes = await this.locationRepository.delete(id);
      // If the location does not exist
      if (deleteRes.affected === 0){
        const errorMessage = `Location with id ${id} not found.`;
        console.error(errorMessage);
        return { status: 404, message: errorMessage }; // Not Found
      }
    } catch (error) {
      console.error('Error deleting location:', error);
      const errorMessage = 'An error occurred while deleting the location.';
      return { status: 500, message: errorMessage }; // Internal Server Error
    }

    return { status: 200, message: 'Location deleted successfully.' }; // OK
  }

  async getAllLocations(): Promise<LocationResponse> {
    try {
      // Fetch locations
      const locations = await this.locationRepository.find();

      // Check if locations were found
      if (locations.length === 0) {
          return { status: 204, message: 'No locations found.' }; // No Content
      }

      return { status: 200, message: 'Locations retrieved successfully.', locations }; // OK
    } catch (error) {
        console.error('Error retrieving locations:', error);
        return { status: 500, message: 'An error occurred while retrieving locations.' }; // Internal Server Error
    }
  }
}