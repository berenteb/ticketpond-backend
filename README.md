# Ticketpond Backend

## Getting Started

### Prerequisites

- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)

### Installation

Install dependencies by running:

```bash
yarn install
```

### Configuration

Create a `.env` file in the root directory of the project based on the `.env.example` file.

### Running the development server

Start Postgres in Docker by running:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

Migration and seeding of the database can be done by running:

```bash
yarn prisma migrate dev
```

Start the development server by running:

```bash
yarn start:dev
```

### Running the Stripe Webhook server for accepting payments during development

```bash
yarn stripe-webhook
```

# Running the production server

```bash
docker-compose -f docker-compose.yml up -d
```
