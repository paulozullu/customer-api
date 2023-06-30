import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  document: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
