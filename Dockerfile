FROM node:latest AS build

WORKDIR /app

COPY package.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:latest
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

CMD ["yarn", "start:migrate:prod"]
