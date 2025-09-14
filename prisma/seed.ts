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
      description: 'Join us for a day of environmental conservation as we plant trees to create a better habitat for our rescued animals and the community. We will plant 100+ native tree species, learn about environmental conservation, create shaded areas for animals, and have community bonding activities. This event will help create a more sustainable environment and provide natural shelter for our rescued animals while contributing to the local ecosystem. Please bring comfortable clothes, water bottle, and enthusiasm to make a difference! Contact: +91-9876543210 or email info@rescueandrehab.org',
      date: new Date('2025-09-14T10:30:00Z'),
      location: 'Julie Charitable Trust, Navsari',
      cityId: navsari.id,
      imageURL: '/images/events/plantation.png',
      eventType: 'ENVIRONMENTAL',
      article: 'Our Tree Plantation Day was a huge success! Over 50 volunteers joined us to plant 150 native trees around our shelter. The community came together beautifully, and we created a greener environment for our rescued animals. The event was covered by local media, and we received positive feedback from all participants. We plan to make this an annual event.'
    },
    {
      name: 'Animal Adoption Drive',
      description: 'Find your perfect companion at our monthly adoption drive. Meet our rescued animals and learn about responsible pet ownership. We have dogs of all ages and sizes, cats and kittens, birds and other small animals. All animals are vaccinated and health-checked. Our team will guide you through the adoption process, including home visits and post-adoption support to ensure a successful match. Please bring valid ID proof and proof of residence. Contact: Adoption Team +91-9876543211',
      date: new Date('2024-04-20T10:00:00Z'),
      location: 'Navsari City Center',
      cityId: navsari.id,
      imageURL: '/images/events/plantation.png',
      eventType: 'ADOPTION_DRIVE',
      article: 'The adoption drive was fantastic! We successfully found loving homes for 12 dogs, 8 cats, and 3 birds. The families were carefully screened, and we are confident that all animals will be well cared for. The event raised awareness about animal adoption in our community, and we received several new volunteer applications.'
    },
    {
      name: 'Veterinary Health Camp',
      description: 'Free health check-ups and vaccinations for stray animals. Join us in caring for the community animals. Our veterinary health camp provides essential medical care for stray and community animals. Services include health check-ups, vaccinations, basic treatments, and health education for pet owners. Bring your community animals or stray animals you care for. Our veterinary team will provide free consultations and treatments. Please bring animals in carriers or on leashes. Contact: Vet Team +91-9876543212',
      date: new Date('2024-05-10T08:00:00Z'),
      location: 'Julie Charitable Trust, Navsari',
      cityId: navsari.id,
      eventType: 'HEALTH_CAMP',
      article: 'Our veterinary health camp treated over 200 animals in a single day! The team of 8 veterinarians worked tirelessly to provide free health check-ups, vaccinations, and treatments. We vaccinated 150 animals and treated various health issues. The community response was overwhelming, and we plan to organize more such camps in the future.'
    },
  ]

  const createdEvents = []
  for (const event of events) {
    const createdEvent = await prisma.event.create({
      data: event,
    })
    createdEvents.push(createdEvent)
  }

  // Add sample gallery items for the first event (Tree Plantation Day)
  if (createdEvents[0]) {
    const galleryItems = [
      {
        eventId: createdEvents[0].id,
        mediaType: 'IMAGE',
        url: '/images/events/plantation.png',
        caption: 'Volunteers planting trees during our Tree Plantation Day',
        altText: 'Tree plantation volunteers',
        isFeatured: true,
        order: 1
      },
      {
        eventId: createdEvents[0].id,
        mediaType: 'IMAGE',
        url: '/images/events/plantation.png',
        caption: 'Community members working together for environmental conservation',
        altText: 'Community tree planting',
        isFeatured: false,
        order: 2
      },
      {
        eventId: createdEvents[0].id,
        mediaType: 'IMAGE',
        url: '/images/events/plantation.png',
        caption: 'Creating a greener environment for our rescued animals',
        altText: 'Green environment for animals',
        isFeatured: false,
        order: 3
      }
    ]

    for (const item of galleryItems) {
      await prisma.eventGallery.create({
        data: item,
      })
    }
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
