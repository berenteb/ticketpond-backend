import { WithoutId } from '../common.types';
import { ExperienceEntity, ExperienceView } from '../entities/experience.entity';

export abstract class ExperienceServiceInterface {
  abstract getExperiences(): Promise<ExperienceView[]>;
  abstract getExperienceById(id: string): Promise<ExperienceView>;
  abstract createExperience(experience: WithoutId<ExperienceEntity>): Promise<ExperienceEntity>;
  abstract updateExperience(id: string, experience: WithoutId<ExperienceEntity>): Promise<ExperienceEntity>;
  abstract deleteExperience(id: string): Promise<void>;
}
