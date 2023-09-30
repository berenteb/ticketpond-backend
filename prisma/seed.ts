import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const MockMerchant = {
  name: 'ABC Organizer Inc',
  description: 'We organize events',
  email: 'hello@abcorganizer.com',
  address: '123 Main St, New York, NY 10030',
  phone: '+1234567890',
};

const MockExperience = {
  name: 'Summer Festival',
  description: 'A festival for the summer',
  startDate: '2023-06-01T00:00:00.000Z',
  endDate: '2023-06-10T00:00:00.000Z',
  bannerImage: 'https://www.example.com/image.png',
  merchantId: 'd920bc96-e5e6-4dd5-9826-4a1961c79866',
};

const MockTicket = {
  name: 'One day ticket',
  description: 'This ticket is valid for one day',
  price: 123,
  validFrom: '2023-06-01T00:00:00.000Z',
  validTo: '2023-06-02T00:00:00.000Z',
};

const MockCustomer = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  address: '123 Main St, New York, NY 10030',
  phone: '+1234567890',
};

async function main() {
  const merchant = await client.merchant.create({
    data: MockMerchant,
  });

  const experience = await client.experience.create({
    data: { ...MockExperience, merchantId: merchant.id },
  });

  const ticket = await client.ticket.create({
    data: {
      ...MockTicket,
      experienceId: experience.id,
    },
  });

  const customer = await client.customer.create({
    data: MockCustomer,
  });

  return {
    merchant,
    experience,
    ticket,
    customer,
  };
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.$disconnect());
