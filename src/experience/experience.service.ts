import { Injectable } from '@nestjs/common';
import { Experience } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienceDto, ExperienceDto, UpdateExperienceDto } from '../types/dtos/experience.dto';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';

@Injectable()
export class ExperienceService implements ExperienceServiceInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async createExperience(experience: CreateExperienceDto): Promise<Experience> {
    return this.prismaService.experience.create({ data: experience });
  }

  async getExperienceById(id: string): Promise<ExperienceDto> {
    return this.prismaService.experience.findUnique({ where: { id }, include: { tickets: true, merchant: true } });
  }

  async getExperiences(): Promise<Experience[]> {
    return this.prismaService.experience.findMany();
  }

  async updateExperience(id: string, experience: UpdateExperienceDto): Promise<Experience> {
    return this.prismaService.experience.update({ where: { id }, data: experience });
  }

  async deleteExperience(id: string): Promise<void> {
    this.prismaService.experience.delete({ where: { id } });
  }
}
