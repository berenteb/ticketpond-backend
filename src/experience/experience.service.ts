import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Experience } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienceDto, DeepExperienceDto, UpdateExperienceDto } from '../types/dtos/experience.dto';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';

@Injectable()
export class ExperienceService implements ExperienceServiceInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async createExperience(experience: CreateExperienceDto): Promise<Experience> {
    const created = await this.prismaService.experience.create({ data: experience });
    Logger.debug(`Created experience with id ${created.id}`, ExperienceService.name);
    return created;
  }

  async getExperienceById(id: string): Promise<DeepExperienceDto> {
    const experience = await this.prismaService.experience.findUnique({
      where: { id },
      include: { tickets: true, merchant: true },
    });
    if (!experience) {
      throw new NotFoundException(`Experience with id ${id} not found`);
    }
    Logger.debug(`Found experience with id ${id}`, ExperienceService.name);
    return experience;
  }

  async getExperiences(): Promise<Experience[]> {
    const experiences = await this.prismaService.experience.findMany();
    Logger.debug(`Found ${experiences.length} experiences`, ExperienceService.name);
    return experiences;
  }

  async updateExperience(id: string, experience: UpdateExperienceDto): Promise<Experience> {
    const updatedExperience = await this.prismaService.experience.update({ where: { id }, data: experience });
    Logger.debug(`Updated experience with id ${id}`, ExperienceService.name);
    return updatedExperience;
  }

  async deleteExperience(id: string): Promise<void> {
    await this.prismaService.experience.delete({ where: { id } });
    Logger.debug(`Deleted experience with id ${id}`, ExperienceService.name);
  }
}
