import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtUser, Permissions } from '../types/jwt.types';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';
import { AUTH0_AUDIENCE, AUTH0_ISSUER_URL } from '../util/configuration.util';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly merhcantService: MerchantServiceInterface) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: AUTH0_AUDIENCE,
      issuer: AUTH0_ISSUER_URL,
      algorithms: ['RS256'],
    });
  }

  validate(payload: JwtUser): JwtUser {
    const merchantForUser = this.merhcantService.getMerchantByUserId(payload.sub);
    if (merchantForUser) {
      payload.permissions.push(Permissions.MERCHANT);
    }
    return payload;
  }
}
