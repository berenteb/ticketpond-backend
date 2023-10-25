import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const PORT = env.get('PORT').default(3001).asPortNumber();

export const AUTH0_ISSUER_URL = env.get('AUTH0_ISSUER_URL').required().asString();
export const AUTH0_AUDIENCE = env.get('AUTH0_AUDIENCE').required().asString();

export const STRIPE_PUBLISHABLE_KEY = env.get('STRIPE_PUBLISHABLE_KEY').required().asString();
export const STRIPE_SECRET_KEY = env.get('STRIPE_SECRET_KEY').required().asString();
export const STRIPE_WEBHOOK_ENDPOINT_SECRET = env.get('STRIPE_WEBHOOK_ENDPOINT_SECRET').required().asString();
