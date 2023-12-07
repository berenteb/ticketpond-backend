import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Experience, OrderStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { DeepExperienceDto } from '../types/dtos/deep-experience.dto';
import { CreateExperienceDto, UpdateExperienceDto } from '../types/dtos/experience.dto';
import { ValidationResponseDto, ValidationResponseMessage } from '../types/dtos/validate.dto';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';

@Injectable()
export class ExperienceService implements ExperienceServiceInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async createExperience(experience: CreateExperienceDto, merchantId: string): Promise<Experience> {
    const created = await this.prismaService.experience.create({ data: { ...experience, merchantId } });
    Logger.debug(`Created experience with id ${created.id}`, ExperienceService.name);
    return created;
  }

  async getExperiencesByMerchantId(id: string): Promise<Experience[]> {
    const experiences = await this.prismaService.experience.findMany({
      where: { merchantId: id },
    });
    Logger.debug(`Found ${experiences.length} experiences for merchant with id ${id}`, ExperienceService.name);
    return experiences;
  }

  async getExperienceById(id: string): Promise<DeepExperienceDto> {
    const experience = await this.prismaService.experience.findUnique({
      where: { id },
      include: { tickets: true, merchant: true },
    });
    if (!experience) {
      throw new NotFoundException(`Experience with id ${id} not found`);
    }
    Logger.debug(`Found experience with id ${id}`, ExperienceService.name);
    return experience;
  }

  async getExperiences(): Promise<Experience[]> {
    const experiences = await this.prismaService.experience.findMany();
    Logger.debug(`Found ${experiences.length} experiences`, ExperienceService.name);
    return experiences;
  }

  async updateExperience(id: string, experience: UpdateExperienceDto): Promise<Experience> {
    const updatedExperience = await this.prismaService.experience.update({ where: { id }, data: experience });
    Logger.debug(`Updated experience with id ${id}`, ExperienceService.name);
    return updatedExperience;
  }

  async deleteExperience(id: string): Promise<void> {
    await this.prismaService.experience.delete({ where: { id } });
    Logger.debug(`Deleted experience with id ${id}`, ExperienceService.name);
  }

  async isOwnProperty(itemId: string, ownerId: string): Promise<boolean> {
    const experience = await this.prismaService.experience.findUnique({ where: { id: itemId, merchantId: ownerId } });
    return !!experience;
  }

  async validateExperiencePass(ticketSerialNumber: string, experienceId: string): Promise<ValidationResponseDto> {
    const orderItem = await this.prismaService.orderItem.findUnique({
      where: { serialNumber: ticketSerialNumber },
      include: { ticket: { include: { experience: true } }, order: { include: { customer: true } } },
    });
    if (!orderItem) {
      return { isValid: false, message: ValidationResponseMessage.NOT_FOUND };
    }
    if (orderItem.ticket.experience.id !== experienceId) {
      return { isValid: false, message: ValidationResponseMessage.INVALID };
    }
    if (orderItem.order.orderStatus !== OrderStatus.PAID) {
      return {
        isValid: false,
        message: ValidationResponseMessage.UNPAID,
        orderItem,
        customer: orderItem.order.customer,
      };
    }

    const customer = orderItem.order.customer;

    delete orderItem.order;

    const now = new Date();
    const start = new Date(orderItem.ticket.validFrom);
    const end = new Date(orderItem.ticket.validTo);

    if (now.getTime() < start.getTime()) {
      return { isValid: false, message: ValidationResponseMessage.TOO_EARLY, orderItem, customer };
    }
    if (now.getTime() > end.getTime()) {
      return { isValid: false, message: ValidationResponseMessage.TOO_LATE, orderItem, customer };
    }
    return { isValid: true, message: ValidationResponseMessage.VALID, orderItem, customer };
  }
}
