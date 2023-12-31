import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const PORT = env.get('PORT').default(3001).asPortNumber();
export const BACKEND_URL = env.get('BACKEND_URL').required().asString();
export const CDN_URL = env.get('CDN_URL').required().asString();

export const AUTH0_ISSUER_URL = env.get('AUTH0_ISSUER_URL').required().asString();
export const AUTH0_AUDIENCE = env.get('AUTH0_AUDIENCE').required().asString();

export const STRIPE_PUBLISHABLE_KEY = env.get('STRIPE_PUBLISHABLE_KEY').required().asString();
export const STRIPE_SECRET_KEY = env.get('STRIPE_SECRET_KEY').required().asString();
export const STRIPE_WEBHOOK_ENDPOINT_SECRET = env.get('STRIPE_WEBHOOK_ENDPOINT_SECRET').required().asString();

export const WALLET_PASS_TYPE_IDENTIFIER = env.get('WALLET_PASS_TYPE_IDENTIFIER').required().asString();
export const WALLET_ORG_NAME = env.get('WALLET_ORG_NAME').required().asString();
export const WALLET_TEAM_ID = env.get('WALLET_TEAM_ID').required().asString();
export const WALLET_ISSUER_ID = env.get('WALLET_ISSUER_ID').required().asString();
export const WALLET_PASSPHRASE = env.get('WALLET_PASSPHRASE').required().asString();

export const EMAIL_HOST = env.get('EMAIL_HOST').required().asString();
export const EMAIL_PORT = env.get('EMAIL_PORT').required().asPortNumber();
export const EMAIL_USERNAME = env.get('EMAIL_USERNAME').required().asString();
export const EMAIL_PASSWORD = env.get('EMAIL_PASSWORD').required().asString();
export const EMAIL_FROM = env.get('EMAIL_FROM').required().asString();
