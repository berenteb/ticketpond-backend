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

Create a `.env.local` file in the root directory of the project based on the `.env.example` file.

### Running the development server

Start the database server by running:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

```bash
yarn start:dev
```

### Running the Stripe Webhook server

```bash
yarn stripe-webhook
```
