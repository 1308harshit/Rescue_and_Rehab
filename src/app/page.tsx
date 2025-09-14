import { prisma } from '@/lib/prisma'
import Hero from '@/components/Hero'
import Statistics from '@/components/Statistics'
import EventsPreview from '@/components/EventsPreview'
import CallToAction from '@/components/CallToAction'

async function getHomepageData() {
  try {
    const [animals, events, cities] = await Promise.all([
      prisma.animal.count({
        where: { isAvailable: true }
      }),
      prisma.event.findMany({
        where: {
          date: {
            gte: new Date()
          }
        },
        include: {
          city: true
        },
        orderBy: {
          date: 'asc'
        },
        take: 3
      }),
      prisma.city.count()
    ])

    return {
      totalAnimals: animals,
      upcomingEvents: events,
      totalCities: cities
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return {
      totalAnimals: 0,
      upcomingEvents: [],
      totalCities: 0
    }
  }
}

export default async function HomePage() {
  const { totalAnimals, upcomingEvents, totalCities } = await getHomepageData()

  return (
    <div className="min-h-screen">
      <Hero />
      <Statistics 
        totalAnimals={totalAnimals}
        totalCities={totalCities}
      />
      <EventsPreview events={upcomingEvents} />
      <CallToAction />
    </div>
  )
}
