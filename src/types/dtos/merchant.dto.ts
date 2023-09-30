import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Merchant } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { PhoneRegex, PhoneRegexMessage, WithoutId } from '../common.types';

export class CreateMerchantDto implements WithoutId<Merchant> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(PhoneRegex, { message: PhoneRegexMessage })
  phone: string;
}

export class UpdateMerchantDto implements Partial<WithoutId<Merchant>> {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional()
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  address: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Matches(PhoneRegex, { message: PhoneRegexMessage })
  phone: string;
}

export class MerchantDto implements Merchant {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;
}
