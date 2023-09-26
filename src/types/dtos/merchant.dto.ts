import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { PhoneRegex, PhoneRegexMessage } from '../common.types';

export class CreateMerchantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

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

export class UpdateMerchantDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  @Matches(PhoneRegex, { message: PhoneRegexMessage })
  phone: string;
}
