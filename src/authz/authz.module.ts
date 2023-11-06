import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MerchantModule } from '../merchant/merchant.module';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), MerchantModule],
  providers: [JwtStrategy, PrismaService],
  exports: [PassportModule],
})
export class AuthzModule {}
