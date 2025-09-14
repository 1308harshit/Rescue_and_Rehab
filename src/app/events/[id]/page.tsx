'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Calendar, MapPin, Clock, Users, ArrowLeft, Share2, Heart, Camera, Play, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Event {
  id: number
  name: string
  description: string
  date: string
  imageURL?: string
  location: string
  eventType: string
  article?: string
  city: {
    name: string
    state: string
  }
  gallery: {
    id: number
    mediaType: string
    url: string
    caption?: string
    altText?: string
    isFeatured: boolean
    order: number
  }[]
}

export default function EventDetailPage() {
  const params = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setEvent(data)
        }
      } catch (error) {
        console.error('Error fetching event:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchEvent()
    }
  }, [params.id])

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

  const getEventTypeColor = (eventType: string) => {
    const colors = {
      ADOPTION_DRIVE: 'bg-blue-100 text-blue-800',
      HEALTH_CAMP: 'bg-green-100 text-green-800',
      AWARENESS_CAMPAIGN: 'bg-purple-100 text-purple-800',
      FUNDRAISING: 'bg-red-100 text-red-800',
      VOLUNTEER_TRAINING: 'bg-orange-100 text-orange-800',
      COMMUNITY_OUTREACH: 'bg-teal-100 text-teal-800',
      ENVIRONMENTAL: 'bg-emerald-100 text-emerald-800',
      GENERAL: 'bg-gray-100 text-gray-800'
    }
    return colors[eventType as keyof typeof colors] || colors.GENERAL
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h1>
          <Link href="/events" className="text-red-600 hover:text-red-700">
            ← Back to Events
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-teal-600 to-emerald-600">
        {event.imageURL && (
          <div className="absolute inset-0">
            <Image
              src={event.imageURL}
              alt={event.name}
              fill
              className="object-cover opacity-30"
            />
          </div>
        )}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <Link 
              href="/events" 
              className="inline-flex items-center text-white/80 hover:text-white mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.eventType)}`}>
                {event.eventType.replace('_', ' ')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.name}</h1>
            <p className="text-xl text-white/90 max-w-3xl">{event.description}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-red-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">{formatDate(event.date)}</p>
                    <p className="text-sm text-gray-600">{formatTime(event.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-red-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">{event.location}</p>
                    <p className="text-sm text-gray-600">{event.city.name}, {event.city.state}</p>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{event.description}</p>
              </div>
            </div>

            {/* Event Article/Report */}
            {event.article && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Report</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{event.article}</p>
                </div>
              </div>
            )}

            {/* Gallery Section */}
            {event.gallery && event.gallery.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {event.gallery
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                    <div 
                      key={item.id} 
                      className="relative aspect-square cursor-pointer group"
                      onClick={() => setSelectedImage(item.url)}
                    >
                      <Image
                        src={item.url}
                        alt={item.altText || item.caption || 'Event photo'}
                        fill
                        className="object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                      />
                      {item.mediaType === 'VIDEO' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      )}
                      {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg">
                          <p className="text-sm truncate">{item.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Info Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Event Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="text-gray-800">{event.eventType.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="text-gray-800">{formatDate(event.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="text-gray-800">{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={selectedImage}
              alt="Event photo"
              width={800}
              height={600}
              className="object-contain max-h-full"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
