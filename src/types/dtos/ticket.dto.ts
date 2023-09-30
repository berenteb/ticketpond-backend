import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Ticket } from '@prisma/client';
import { IsDate, IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { WithoutId } from '../common.types';
import { ExperienceDto } from './experience.dto';

export class CreateTicketDto implements WithoutId<Ticket> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  validFrom: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  validTo: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  experienceId: string;
}

export class UpdateTicketDto implements Partial<WithoutId<Ticket>> {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional()
  @IsDecimal()
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @ApiPropertyOptional()
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  validFrom: Date;

  @ApiPropertyOptional()
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  validTo: Date;
}

export class TicketDto implements Ticket {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  validFrom: Date;
  @ApiProperty()
  validTo: Date;
  @ApiProperty()
  experienceId: string;
}

export class DeepTicketDto extends TicketDto {
  experience: ExperienceDto;
}
