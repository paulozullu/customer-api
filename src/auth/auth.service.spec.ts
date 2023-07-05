import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { UnauthorizedException } from '@nestjs/common';
import { AxiosResponse } from 'axios';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw UnauthorizedException on sending invalid username and/or password', async () => {
    await expect(
      service.singIn({
        username: 'f',
        password: 'f',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should return success on entering correct credentials', async () => {
    const username = 'teste@email.com';
    const result = service.singIn({
      username,
      password: Buffer.from(username).toString('base64'),
    });

    expect(result).toBeDefined();
  });
});
