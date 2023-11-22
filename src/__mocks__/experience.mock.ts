import { Experience } from '@prisma/client';
import { DeepExperienceDto } from '../types/dtos/deep-experience.dto';
import { MerchantMock } from './merchant.mock';
import { TicketMock } from './ticket.mock';

export const ExperienceMock: Experience = {
  id: 'test-experience-id',
  name: 'test-experience-name',
  description: 'test-experience-description',
  startDate: new Date(),
  endDate: new Date(),
  bannerImage: 'test-experience-banner-image',
  merchantId: 'test-merchant-id',
};

export const DeepExperienceMock: DeepExperienceDto = {
  ...ExperienceMock,
  tickets: [TicketMock],
  merchant: MerchantMock,
};
