import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Ticket } from '@prisma/client';
import { IsDate, IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { WithoutId } from '../common.types';
import { ExperienceDto } from './experience.dto';

export class CreateTicketDto implements WithoutId<Ticket> {
  @ApiProperty({ example: 'One day ticket' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'This ticket is valid for one day' })
  @IsString()
  description: string;

  @ApiProperty({ example: 123.0 })
  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: '2023-06-01T00:00:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  validFrom: Date;

  @ApiProperty({ example: '2023-06-02T00:00:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  validTo: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  experienceId: string;
}

export class UpdateTicketDto implements Partial<WithoutId<Ticket>> {
  @ApiPropertyOptional({ example: 'One day ticket' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ example: 'This ticket is valid for one day' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ example: 123.0 })
  @IsDecimal()
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @ApiPropertyOptional({ example: '2023-06-01T00:00:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  validFrom: Date;

  @ApiPropertyOptional({ example: '2023-06-02T00:00:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  validTo: Date;
}

export class TicketDto implements Ticket {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;
  @ApiProperty({ example: 'One day ticket' })
  name: string;
  @ApiProperty({ example: 'This ticket is valid for one day' })
  description: string;
  @ApiProperty({ example: 123.0 })
  price: number;
  @ApiProperty({ example: '2023-06-01T00:00:00.000Z' })
  validFrom: Date;
  @ApiProperty({ example: '2023-06-02T00:00:00.000Z' })
  validTo: Date;
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  experienceId: string;
}

export class DeepTicketDto extends TicketDto {
  experience: ExperienceDto;
}
