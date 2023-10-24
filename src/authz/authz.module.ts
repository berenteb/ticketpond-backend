import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MerchantService } from '../merchant/merchant.service';
import { PrismaService } from '../prisma/prisma.service';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, { provide: MerchantServiceInterface, useClass: MerchantService }, PrismaService],
  exports: [PassportModule],
})
export class AuthzModule {}
