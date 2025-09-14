import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Navsari city
  const navsari = await prisma.city.upsert({
    where: { name: 'Navsari' },
    update: {},
    create: {
      name: 'Navsari',
      state: 'Gujarat',
      country: 'India',
    },
  })

  // Create contact info for Navsari
  await prisma.contactInfo.upsert({
    where: { cityId: navsari.id },
    update: {},
    create: {
      cityId: navsari.id,
      phoneNumbers: ['+91-9876543210', '+91-9876543211'],
      email: 'info@rescueandrehab.org',
      address: 'Julie Charitable Trust, Navsari, Gujarat, India',
    },
  })

  // Create shelter for Navsari
  const shelter = await prisma.shelter.create({
    data: {
      name: 'Julie Charitable Trust',
      address: 'Navsari, Gujarat, India',
      registrationNo: 'REG-2024-001',
      cityId: navsari.id,
    },
  })

  // Create sample animals
  const animals = [
    {
      name: 'Buddy',
      type: 'DOG' as const,
      age: 3,
      story: 'Buddy was found injured on the streets of Navsari. After receiving medical care, he has become a loving and playful companion.',
      imageURL: ['/images/animals/dogs/small-dog-1.jpg'],
      shelterId: shelter.id,
    },
    {
      name: 'Luna',
      type: 'DOG' as const,
      age: 2,
      story: 'Luna is a gentle soul who was abandoned by her previous owners. She loves children and would make a perfect family pet.',
      imageURL: ['/images/animals/dogs/small-dog-3.jpg'],
      shelterId: shelter.id,
    },
    {
      name: 'Ganga',
      type: 'COW' as const,
      age: 5,
      story: 'Ganga was rescued from a dairy farm where she was being mistreated. She now enjoys a peaceful life at our shelter.',
      imageURL: ['/images/animals/cows/cow-1.jpg'],
      shelterId: shelter.id,
    },
    {
      name: 'Tweety',
      type: 'BIRD' as const,
      age: 1,
      story: 'Tweety is a beautiful parrot who was found with a broken wing. After rehabilitation, he is ready for adoption.',
      imageURL: ['/images/animals/birds/bird-1.jpg'],
      shelterId: shelter.id,
    },
  ]

  for (const animal of animals) {
    await prisma.animal.create({
      data: animal,
    })
  }

  // Create sample events
  const events = [
    {
      name: 'Tree Plantation Day',
      description: 'Join us for a day of environmental conservation as we plant trees to create a better habitat for our rescued animals and the community.',
      date: new Date('2025-09-14T10:30:00Z'),
      location: 'Julie Charitable Trust, Navsari',
      cityId: navsari.id,
      imageURL: '/images/events/plantation.png',
    },
    {
      name: 'Animal Adoption Drive',
      description: 'Find your perfect companion at our monthly adoption drive. Meet our rescued animals and learn about responsible pet ownership.',
      date: new Date('2024-04-20T10:00:00Z'),
      location: 'Navsari City Center',
      cityId: navsari.id,
      imageURL: '/images/events/adoption-drive.jpg',
    },
    {
      name: 'Veterinary Health Camp',
      description: 'Free health check-ups and vaccinations for stray animals. Join us in caring for the community animals.',
      date: new Date('2024-05-10T08:00:00Z'),
      location: 'Julie Charitable Trust, Navsari',
      cityId: navsari.id,
    },
  ]

  for (const event of events) {
    await prisma.event.create({
      data: event,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
