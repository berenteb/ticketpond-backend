import { Ticket } from '@prisma/client';
import { DeepTicketDto } from '../../types/dtos/deep-ticket.dto';
import { ExperienceMock } from './experience.mock';

export const TicketMock: Ticket = {
  id: 'test-ticket-id',
  name: 'test-ticket-name',
  description: 'test-ticket-description',
  price: 100,
  experienceId: 'test-experience-id',
  validFrom: new Date(),
  validTo: new Date(),
};

export const DeepTicketMock: DeepTicketDto = {
  ...TicketMock,
  experience: ExperienceMock,
};
