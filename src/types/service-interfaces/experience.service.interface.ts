import { Experience } from '@prisma/client';
import { CreateExperienceDto, ExperienceDto, UpdateExperienceDto } from '../dtos/experience.dto';

export abstract class ExperienceServiceInterface {
  abstract getExperiences(): Promise<Experience[]>;
  abstract getExperienceById(id: string): Promise<ExperienceDto>;
  abstract createExperience(experience: CreateExperienceDto): Promise<Experience>;
  abstract updateExperience(id: string, experience: UpdateExperienceDto): Promise<Experience>;
  abstract deleteExperience(id: string): Promise<void>;
}
