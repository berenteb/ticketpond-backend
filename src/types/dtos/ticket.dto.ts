import { Experience } from '@prisma/client';
import { IsDate, IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @IsDate()
  @IsNotEmpty()
  validFrom: Date;

  @IsDate()
  @IsNotEmpty()
  validTo: Date;

  @IsString()
  @IsNotEmpty()
  experienceId: string;
}

export class UpdateTicketDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDecimal()
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  validFrom: Date;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  validTo: Date;
}

export class TicketDto {
  name: string;
  description: string;
  price: number;
  validFrom: Date;
  validTo: Date;
  experience: Experience;
}
