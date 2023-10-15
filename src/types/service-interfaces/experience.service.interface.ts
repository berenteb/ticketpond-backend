import { DeepExperienceDto } from '../dtos/deep-experience.dto';
import { CreateExperienceDto, ExperienceDto, UpdateExperienceDto } from '../dtos/experience.dto';

export abstract class ExperienceServiceInterface {
  abstract getExperiences(): Promise<ExperienceDto[]>;
  abstract getExperiencesByMerchantId(id: string): Promise<ExperienceDto[]>;

  abstract getExperienceById(id: string): Promise<DeepExperienceDto>;

  abstract createExperience(experience: CreateExperienceDto, merchantId: string): Promise<ExperienceDto>;

  abstract updateExperience(id: string, experience: UpdateExperienceDto): Promise<ExperienceDto>;
  abstract deleteExperience(id: string): Promise<void>;
}
