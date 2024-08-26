import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('create', () => {
    it('should create a new item', async () => {
      const newItem = { id: 1, name: 'New Item' };
      jest.spyOn(appService, 'create').mockResolvedValue(newItem);

      const result = await appController.createLocation(newItem.name);
      expect(result).toEqual(newItem);
    });
  });

  describe('update', () => {
    it('should update an existing item', async () => {
      const existingItem = { id: 1, name: 'Existing Item' };
      const updatedItem = { ...existingItem, name: 'Updated Item' };
      jest.spyOn(appService, 'update').mockResolvedValue(updatedItem);

      const result = await appController.updateLocation(existingItem.id, updatedItem.name);
      expect(result).toEqual(updatedItem);
    });
  });

  describe('delete', () => {
    it('should delete an item', async () => {
      const itemId = 1;
      jest.spyOn(appService, 'delete').mockResolvedValue(null);

      await appController.deleteLocation(itemId);
      expect(appService.deleteLocation).toHaveBeenCalledWith(itemId);
    });
  });
});