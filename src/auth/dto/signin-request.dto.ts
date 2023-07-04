import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsEmail, IsNotEmpty } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBase64()
  password: string;
}
