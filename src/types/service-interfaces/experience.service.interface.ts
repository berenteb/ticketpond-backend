import { WithoutId } from '../common.types';
import { ExperienceEntity } from '../entities/experience.entity';

export abstract class ExperienceServiceInterface {
  abstract getExperiences(): Promise<ExperienceEntity[]>;
  abstract getExperienceById(id: string): Promise<ExperienceEntity>;
  abstract createExperience(experience: WithoutId<ExperienceEntity>): Promise<ExperienceEntity>;
  abstract updateExperience(id: string, experience: WithoutId<ExperienceEntity>): Promise<ExperienceEntity>;
  abstract deleteExperience(id: string): Promise<void>;
}
