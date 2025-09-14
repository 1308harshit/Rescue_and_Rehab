'use client'

import Link from 'next/link'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'

interface Event {
  id: number
  name: string
  description: string
  date: string
  location: string
  imageURL?: string
  city: {
    name: string
    state: string
  }
}

interface EventsPreviewProps {
  events: Event[]
}

export default function EventsPreview({ events }: EventsPreviewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us in our mission to help animals in need
          </p>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {events.map((event) => (
              <div key={event.id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {event.imageURL && (
                  <div className="h-48 bg-gray-200">
                    <img
                      src={event.imageURL}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {formatDate(event.date)} at {formatTime(event.date)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {event.location}, {event.city.name}
                      </span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/events#event-${event.id}`}
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No upcoming events
            </h3>
            <p className="text-gray-500">
              Check back soon for new events and activities
            </p>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/events"
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            View All Events
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
