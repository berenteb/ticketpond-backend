import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const PORT = env.get('PORT').default(3001).asPortNumber();

export const AUTH0_ISSUER_URL = env.get('AUTH0_ISSUER_URL').required().asString();
export const AUTH0_AUDIENCE = env.get('AUTH0_AUDIENCE').required().asString();
