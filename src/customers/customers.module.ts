import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { RedisModule } from '../connection/redis/redis.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [RedisModule, HttpModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
