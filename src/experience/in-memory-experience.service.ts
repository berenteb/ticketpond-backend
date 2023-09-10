import { Injectable } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { ExperienceEntity, ExperienceView } from '../types/entities/experience.entity';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';

@Injectable()
export class InMemoryExperienceService implements ExperienceServiceInterface {
  private experiences: ExperienceEntity[];
  private idCounter: number;

  constructor(private readonly ticketService: TicketServiceInterface) {}

  async createExperience(experience: WithoutId<ExperienceEntity>): Promise<ExperienceEntity> {
    const newExperience: ExperienceEntity = {
      ...experience,
      id: this.idCounter.toString(),
    };
    this.experiences.push(newExperience);
    this.idCounter++;
    return Promise.resolve(newExperience);
  }

  async deleteExperience(id: string): Promise<void> {
    this.experiences = this.experiences.filter((experience) => experience.id !== id);
    return Promise.resolve();
  }

  async getExperienceById(id: string): Promise<ExperienceView> {
    const experience = this.experiences.find((experience) => experience.id === id);
    const ticketsForExperience = await this.ticketService.getTicketForExperience(id);
    const experienceView: ExperienceView = {
      ...experience,
      tickets: ticketsForExperience,
    };
    return Promise.resolve(experienceView);
  }

  async getExperiences(): Promise<ExperienceView[]> {
    const experiencesWithTickets = await Promise.all(
      this.experiences.map(async (experience) => {
        const ticketsForExperience = await this.ticketService.getTicketForExperience(experience.id);
        const experienceView: ExperienceView = {
          ...experience,
          tickets: ticketsForExperience,
        };
        return experienceView;
      })
    );
    return Promise.resolve(experiencesWithTickets);
  }

  updateExperience(id: string, experience: WithoutId<ExperienceEntity>): Promise<ExperienceEntity> {
    const index = this.experiences.findIndex((experience) => experience.id === id);
    const updatedExperience: ExperienceEntity = {
      ...experience,
      id,
    };
    this.experiences[index] = updatedExperience;
    return Promise.resolve(updatedExperience);
  }
}
