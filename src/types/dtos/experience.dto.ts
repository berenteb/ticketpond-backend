import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Experience } from '@prisma/client';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { WithoutId } from '../common.types';
import { MerchantDto } from './merchant.dto';
import { TicketDto } from './ticket.dto';

export class CreateExperienceDto implements WithoutId<Experience> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty()
  @IsString()
  bannerImage: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  merchantId: string;
}

export class UpdateExperienceDto implements Partial<WithoutId<Experience>> {
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
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  startDate: Date;

  @ApiPropertyOptional()
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  endDate: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bannerImage: string;
}

export class ExperienceDto implements Experience {
  @ApiProperty()
  id: string;
  @ApiProperty()
  merchantId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;
  @ApiProperty()
  bannerImage: string;
}

export class DeepExperienceDto extends ExperienceDto {
  @ApiProperty()
  merchant: MerchantDto;
  @ApiProperty({ type: [TicketDto] })
  tickets: TicketDto[];
}
