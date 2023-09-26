import { Merchant, Ticket } from '@prisma/client';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  bannerImage: string;

  @IsString()
  @IsNotEmpty()
  merchantId: string;
}

export class UpdateExperienceDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  endDate: Date;

  @IsString()
  @IsOptional()
  bannerImage: string;
}

export class ExperienceDto {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  bannerImage: string;
  merchant: Merchant;
  tickets: Ticket[];
}
