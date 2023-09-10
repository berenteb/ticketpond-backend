import { Injectable } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { ExperienceEntity, ExperienceView } from '../types/entities/experience.entity';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';

@Injectable()
export class ExperienceService implements ExperienceServiceInterface {
  createExperience(experience: WithoutId<ExperienceEntity>): Promise<ExperienceEntity> {
    return Promise.resolve(undefined);
  }

  deleteExperience(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getExperienceById(id: string): Promise<ExperienceView> {
    return Promise.resolve(undefined);
  }

  getExperiences(): Promise<ExperienceView[]> {
    return Promise.resolve([]);
  }

  updateExperience(id: string, experience: WithoutId<ExperienceEntity>): Promise<ExperienceEntity> {
    return Promise.resolve(undefined);
  }
}
