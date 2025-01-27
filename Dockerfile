FROM node:20-bullseye AS base

WORKDIR /app

COPY . .

RUN npm ci

RUN cd ./src && npx prisma generate



# FROM base AS dev-migrate-seed

# CMD ["npm", "run", "start:migrate:seed:dev"]

# FROM base AS prod

# RUN npm run build

# USER node

# CMD ["npm", "run", "start:migrate:seed:prod"]

FROM base AS dev

CMD ["npm", "run", "start"]

FROM base AS prod

RUN npm run build

USER node

CMD ["npm", "run", "start:prod"]

# CMD ["cd", "./src", "&&","prisma", "migrate", "deploy", "&&", "npm", "run", "start:prod"]

# CMD ["npm", "run", "start:migrate:seed:prod"]