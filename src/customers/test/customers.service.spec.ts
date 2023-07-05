import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from '../customers.service';
import { RedisService } from '../../connection/redis/redis.service';
import { RedisModule } from '../../connection/redis/redis.module';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RedisModule],
      providers: [CustomersService, RedisService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
