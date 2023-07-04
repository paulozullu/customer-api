import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import * as qs from 'qs';
import { catchError, map } from 'rxjs';
import { SignInRequestDto } from './dto/signin-request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async singIn(data: SignInRequestDto): Promise<any> {
    const config: AxiosRequestConfig = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };

    const requestBody = {
      grant_type: process.env.AUTH_GRANT_TYPE,
      client_id: process.env.AUTH_CLIENT_ID,
      client_secret: process.env.AUTH_CLIENT_SECRET,
      scope: process.env.AUTH_SCOPE,
      ...data,
    };

    return this.httpService
      .post(
        `${process.env.AUTH_URL_PREFIX}${process.env.AUTH_TOKEN_URL}`,
        qs.stringify(requestBody),
        config,
      )
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError((err) => {
          Logger.error(err?.response?.data || err, AuthService.name);
          throw new HttpException(err.response.data, err.response.status);
        }),
      );
  }
}
