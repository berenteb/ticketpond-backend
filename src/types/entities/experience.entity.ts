import { Identifiable } from '../common.types';

export type ExperienceEntity = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  bannerImage: string;
} & Identifiable;
