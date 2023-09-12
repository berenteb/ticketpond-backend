import { Identifiable } from '../common.types';
import { TicketEntity } from './ticket.entity';

export type ExperienceEntity = {
  name: string;
  description: string;
  startDate: number;
  endDate: number;
  location: string;
  bannerImage: string;
} & Identifiable;

export type ExperienceView = ExperienceEntity & {
  tickets: TicketEntity;
};
