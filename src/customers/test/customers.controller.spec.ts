import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from '../customers.controller';
import { CustomersService } from '../customers.service';
import { AuthService } from '../../auth/auth.service';
import { AuthModule } from '../../auth/auth.module';
import { RedisService } from '../../connection/redis/redis.service';
import { RedisModule } from '../../connection/redis/redis.module';
import { HttpModule } from '@nestjs/axios';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  const mockedCustomers = [
    '{ "document": 1, "name": "Teste 1" }',
    '{ "document": 2, "name": "Teste 2" }',
  ];
  const mockedCustomer = { document: 3, name: 'Teste 3' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService, AuthService, RedisService],
      imports: [AuthModule, RedisModule, HttpModule],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(async () => mockedCustomers);

      const result = await controller.findAll();

      expect(JSON.parse(result[0])).toHaveProperty('document');
      expect(JSON.parse(result[0])).toHaveProperty('name');
    });
  });

  describe('findOne', () => {
    it('should return a customer', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(async () => mockedCustomers[0]);

      const result = await controller.findOne('123');
      const parsedResult = JSON.parse(result);

      expect(parsedResult).toHaveProperty('document');
      expect(parsedResult).toHaveProperty('name');
      expect(parsedResult.document).toBe(
        JSON.parse(mockedCustomers[0]).document,
      );
      expect(parsedResult.name).toBe(JSON.parse(mockedCustomers[0]).name);
    });
  });

  describe('create', () => {
    it('should create a customer', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => JSON.stringify(mockedCustomer));

      const result = await controller.create(mockedCustomer);
      const parsedResult = JSON.parse(result);

      expect(parsedResult).toHaveProperty('document');
      expect(parsedResult).toHaveProperty('name');
      expect(parsedResult.document).toBe(3);
      expect(parsedResult.name).toBe('Teste 3');
    });
  });

  describe('update', () => {
    it('should update a customer', async () => {
      jest
        .spyOn(service, 'update')
        .mockImplementation(async () => JSON.stringify(mockedCustomer));

      const result = await controller.update('123', mockedCustomer);
      const parsedResult = JSON.parse(result);

      expect(parsedResult).toHaveProperty('document');
      expect(parsedResult).toHaveProperty('name');
      expect(parsedResult.document).toBe(3);
      expect(parsedResult.name).toBe('Teste 3');
    });
  });

  describe('remove', () => {
    it('should remove a customer', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => 1);

      const result = await controller.remove('123');

      expect(result).toBe(1);
    });
  });
});
