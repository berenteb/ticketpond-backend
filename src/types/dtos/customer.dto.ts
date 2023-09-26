import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { PhoneRegex, PhoneRegexMessage } from '../common.types';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @Matches(PhoneRegex, { message: PhoneRegexMessage })
  phone: string;
}

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(PhoneRegex, { message: PhoneRegexMessage })
  phone: string;
}
