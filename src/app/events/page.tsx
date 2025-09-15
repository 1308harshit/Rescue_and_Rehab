'use client'

import { useState, useEffect } from 'react'
import { useCity } from '@/context/CityContext'
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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

export default function EventsPage() {
  const { selectedCity } = useCity()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showUpcoming, setShowUpcoming] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        
        if (selectedCity) {
          params.append('cityId', selectedCity.id.toString())
        }
        
        if (showUpcoming) {
          params.append('upcoming', 'true')
        }

        const response = await fetch(`/api/events?${params}`)
        if (response.ok) {
          const data = await response.json()
          setEvents(data)
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [selectedCity, showUpcoming])

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

  const isEventUpcoming = (dateString: string) => {
    return new Date(dateString) >= new Date()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Calendar className="h-16 w-16" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Our <span className="text-yellow-300">Events</span>
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Join us in our mission to help animals in need. From adoption drives to 
            awareness campaigns, there&apos;s always something happening at Rescue and Rehab Foundation.
          </p>
        </div>
      </section>

      {/* Filter Info */}
      {selectedCity && (
        <section className="py-4 bg-red-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center text-red-800">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Showing events in {selectedCity.name}, {selectedCity.state}</span>
            </div>
          </div>
        </section>
      )}

      {/* Event Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setShowUpcoming(true)}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  showUpcoming
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setShowUpcoming(false)}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  !showUpcoming
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                All Events
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {showUpcoming ? 'Upcoming Events' : 'All Events'} ({events.length})
                </h2>
                <p className="text-gray-600">
                  Join us in making a difference for animals in need
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    {event.imageURL && (
                      <div className="h-48 bg-gray-200 relative">
                        <Image
                          src={event.imageURL}
                          alt={event.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center mb-3">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isEventUpcoming(event.date)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {isEventUpcoming(event.date) ? 'Upcoming' : 'Past Event'}
                        </div>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 leading-tight">
                        {event.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {event.description.length > 120 
                          ? `${event.description.substring(0, 120)}...` 
                          : event.description
                        }
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">
                            {formatDate(event.date)}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">
                            {formatTime(event.date)}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">
                            {event.location}, {event.city.name}
                          </span>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/events/${event.id}`}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 px-4 rounded-lg transition-colors inline-flex items-center justify-center text-sm sm:text-base"
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No events found
              </h3>
              <p className="text-gray-500 mb-6">
                {selectedCity 
                  ? `No ${showUpcoming ? 'upcoming' : ''} events are scheduled in ${selectedCity.name}.`
                  : `No ${showUpcoming ? 'upcoming' : ''} events are currently scheduled.`
                }
              </p>
              <p className="text-gray-500">
                Check back soon for new events and activities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Types of Events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We organize various types of events to support our mission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Adoption Drives</h3>
              <p className="text-gray-600">Meet and adopt rescued animals</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Health Camps</h3>
              <p className="text-gray-600">Free medical care for stray animals</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Awareness Campaigns</h3>
              <p className="text-gray-600">Educating communities about animal welfare</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ArrowRight className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Fundraising Events</h3>
              <p className="text-gray-600">Supporting our rescue operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Want to Organize an Event?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Have an idea for an event that could help animals? We&apos;d love to hear from you 
            and explore collaboration opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Contact Us
            </a>
            <a
              href="/donate"
              className="bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Support Our Events
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
