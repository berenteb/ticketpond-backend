import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceMock } from '../__mocks__/entities/experience.mock';
import { PrismaMock } from '../__mocks__/services/prisma.mock';
import { PrismaService } from '../prisma/prisma.service';
import { ExperienceService } from './experience.service';

let service: ExperienceService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [ExperienceService, { provide: PrismaService, useValue: PrismaMock }],
  }).compile();

  service = module.get<ExperienceService>(ExperienceService);
});

it('should create experience with merchant id', async () => {
  PrismaMock.experience.create.mockResolvedValue(ExperienceMock);
  const experience = await service.createExperience(ExperienceMock, 'test-merchant-id');
  expect(PrismaMock.experience.create).toHaveBeenCalledWith({
    data: { ...ExperienceMock, merchantId: 'test-merchant-id' },
  });
  expect(experience).toEqual(ExperienceMock);
});

it('should get experiences by merchant id', async () => {
  PrismaMock.experience.findMany.mockResolvedValue([ExperienceMock]);
  const experiences = await service.getExperiencesByMerchantId('test-merchant-id');
  expect(PrismaMock.experience.findMany).toHaveBeenCalledWith({ where: { merchantId: 'test-merchant-id' } });
  expect(experiences).toEqual([ExperienceMock]);
});

it('should get experience by id', async () => {
  PrismaMock.experience.findUnique.mockResolvedValue(ExperienceMock);
  const experience = await service.getExperienceById('test-experience-id');
  expect(PrismaMock.experience.findUnique).toHaveBeenCalledWith({
    where: { id: 'test-experience-id' },
    include: { merchant: true, tickets: true },
  });
  expect(experience).toEqual(ExperienceMock);
});

it('should throw not found exception when getting experience by id', async () => {
  PrismaMock.experience.findUnique.mockResolvedValue(null);
  await expect(service.getExperienceById('test-experience-id')).rejects.toThrowError(
    'Experience with id test-experience-id not found'
  );
});

it('should get experiences', async () => {
  PrismaMock.experience.findMany.mockResolvedValue([ExperienceMock]);
  const experiences = await service.getExperiences();
  expect(PrismaMock.experience.findMany).toHaveBeenCalledWith();
  expect(experiences).toEqual([ExperienceMock]);
});

it('should update experience by id', async () => {
  PrismaMock.experience.update.mockResolvedValue(ExperienceMock);
  const experience = await service.updateExperience('test-experience-id', ExperienceMock);
  expect(PrismaMock.experience.update).toHaveBeenCalledWith({
    where: { id: 'test-experience-id' },
    data: ExperienceMock,
  });
  expect(experience).toEqual(ExperienceMock);
});

it('should delete experience by id', async () => {
  await service.deleteExperience('test-experience-id');
  expect(PrismaMock.experience.delete).toHaveBeenCalledWith({ where: { id: 'test-experience-id' } });
});

it('should check if experience is own property', async () => {
  PrismaMock.experience.findUnique.mockResolvedValue(ExperienceMock);
  const isOwn = await service.isOwnProperty('test-experience-id', 'test-merchant-id');
  expect(PrismaMock.experience.findUnique).toHaveBeenCalledWith({
    where: { id: 'test-experience-id', merchantId: 'test-merchant-id' },
  });
  expect(isOwn).toEqual(true);
});

it('should validate experience pass', async () => {
  const MockOrderItem = {
    ticket: {
      experience: { id: 'test-experience-id' },
      validTo: '2100-01-01T00:00:00.000Z',
      validFrom: '2000-01-01T00:00:00.000Z',
    },
    order: { customer: { id: 'test-customer-id' }, orderStatus: 'PAID' },
  };
  PrismaMock.orderItem.findUnique.mockResolvedValue(MockOrderItem);
  const validationResponse = await service.validateExperiencePass('test-serial-number', 'test-experience-id');
  expect(PrismaMock.orderItem.findUnique).toHaveBeenCalledWith({
    where: { serialNumber: 'test-serial-number' },
    include: { ticket: { include: { experience: true } }, order: { include: { customer: true } } },
  });
  expect(validationResponse).toEqual({
    isValid: true,
    message: 'VALID',
    orderItem: {
      ticket: {
        experience: { id: 'test-experience-id' },
        validTo: '2100-01-01T00:00:00.000Z',
        validFrom: '2000-01-01T00:00:00.000Z',
      },
    },
    customer: { id: 'test-customer-id' },
  });
});

it('should return not found validation response when validating experience pass', async () => {
  PrismaMock.orderItem.findUnique.mockResolvedValue(null);
  const validationResponse = await service.validateExperiencePass('test-serial-number', 'test-experience-id');
  expect(PrismaMock.orderItem.findUnique).toHaveBeenCalledWith({
    where: { serialNumber: 'test-serial-number' },
    include: { ticket: { include: { experience: true } }, order: { include: { customer: true } } },
  });
  expect(validationResponse).toEqual({ isValid: false, message: 'NOT_FOUND' });
});

it('should return invalid validation response when validating experience pass', async () => {
  PrismaMock.orderItem.findUnique.mockResolvedValue({
    ticket: { experience: { id: 'test-experience-id' } },
    order: { customer: { id: 'test-customer-id' } },
  });
  const validationResponse = await service.validateExperiencePass('test-serial-number', 'test-wrong-experience-id');
  expect(PrismaMock.orderItem.findUnique).toHaveBeenCalledWith({
    where: { serialNumber: 'test-serial-number' },
    include: { ticket: { include: { experience: true } }, order: { include: { customer: true } } },
  });
  expect(validationResponse).toEqual({ isValid: false, message: 'INVALID' });
});

it('should return unpaid validation response when validating experience pass', async () => {
  PrismaMock.orderItem.findUnique.mockResolvedValue({
    ticket: { experience: { id: 'test-experience-id' } },
    order: { customer: { id: 'test-customer-id' }, orderStatus: 'CREATED' },
  });
  const validationResponse = await service.validateExperiencePass('test-serial-number', 'test-experience-id');
  expect(PrismaMock.orderItem.findUnique).toHaveBeenCalledWith({
    where: { serialNumber: 'test-serial-number' },
    include: { ticket: { include: { experience: true } }, order: { include: { customer: true } } },
  });
  expect(validationResponse).toEqual({
    isValid: false,
    message: 'UNPAID',
    orderItem: {
      ticket: { experience: { id: 'test-experience-id' } },
      order: { customer: { id: 'test-customer-id' }, orderStatus: 'CREATED' },
    },
    customer: { id: 'test-customer-id' },
  });
});

it('should return too early validation response when validating experience pass', async () => {
  const MockOrderItem = {
    ticket: {
      experience: { id: 'test-experience-id' },
      validFrom: '2100-01-01T00:00:00.000Z',
      validTo: '2100-01-01T00:00:00.000Z',
    },
    order: { customer: { id: 'test-customer-id' }, orderStatus: 'PAID' },
  };

  PrismaMock.orderItem.findUnique.mockResolvedValue(MockOrderItem);
  const validationResponse = await service.validateExperiencePass('test-serial-number', 'test-experience-id');
  expect(PrismaMock.orderItem.findUnique).toHaveBeenCalledWith({
    where: { serialNumber: 'test-serial-number' },
    include: { ticket: { include: { experience: true } }, order: { include: { customer: true } } },
  });
  expect(validationResponse).toEqual({
    isValid: false,
    message: 'TOO_EARLY',
    orderItem: {
      ticket: {
        experience: { id: 'test-experience-id' },
        validFrom: '2100-01-01T00:00:00.000Z',
        validTo: '2100-01-01T00:00:00.000Z',
      },
    },
    customer: { id: 'test-customer-id' },
  });
});

it('should return too late validation response when validating experience pass', async () => {
  PrismaMock.orderItem.findUnique.mockResolvedValue({
    ticket: {
      experience: { id: 'test-experience-id' },
      validFrom: '2000-01-01T00:00:00.000Z',
      validTo: '2000-01-01T00:00:00.000Z',
    },
    order: { customer: { id: 'test-customer-id' }, orderStatus: 'PAID' },
  });
  const validationResponse = await service.validateExperiencePass('test-serial-number', 'test-experience-id');
  expect(PrismaMock.orderItem.findUnique).toHaveBeenCalledWith({
    where: { serialNumber: 'test-serial-number' },
    include: { ticket: { include: { experience: true } }, order: { include: { customer: true } } },
  });
  expect(validationResponse).toEqual({
    isValid: false,
    message: 'TOO_LATE',
    orderItem: {
      ticket: {
        experience: { id: 'test-experience-id' },
        validFrom: '2000-01-01T00:00:00.000Z',
        validTo: '2000-01-01T00:00:00.000Z',
      },
    },
    customer: { id: 'test-customer-id' },
  });
});
