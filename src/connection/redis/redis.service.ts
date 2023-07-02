import { Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

export class RedisService extends Redis {
  constructor() {
    super();

    super.on('error', (err) => {
      Logger.error('Error on Redis', err, RedisService.name);
      process.exit(1);
    });

    super.on('connect', () => {
      Logger.log('Redis connected', RedisService.name);
    });
  }
}
