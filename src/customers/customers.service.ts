import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { RedisService } from '../connection/redis/redis.service';
import generateUuid4 from '../utils/uuid/generateUuid4';

@Injectable()
export class CustomersService {
  private readonly ALIAS = 'customer:';
  constructor(private readonly redisService: RedisService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const id = `${this.ALIAS}${generateUuid4()}`;
      await this.redisService.set(id, JSON.stringify(createCustomerDto));
      return await this.redisService.get(id);
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      return await this.redisService.keys(`${this.ALIAS}*`);
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: string) {
    try {
      const customer = await this.redisService.get(id);

      if (!customer) throw new NotFoundException('Cliente inexistente');

      return customer;
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      await this.findOne(id);

      await this.redisService.set(id, JSON.stringify(updateCustomerDto));
      return await this.redisService.get(id);
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      return await this.redisService.del(id);
    } catch (err) {
      throw err;
    }
  }
}
