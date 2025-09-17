'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Calendar, MapPin, Type } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

interface City {
  id: number
  name: string
  state: string
}

export default function AddEventPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [cities, setCities] = useState<City[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    eventType: 'GENERAL' as 'ADOPTION_DRIVE' | 'HEALTH_CAMP' | 'AWARENESS_CAMPAIGN' | 'FUNDRAISING' | 'VOLUNTEER_TRAINING' | 'COMMUNITY_OUTREACH' | 'ENVIRONMENTAL' | 'GENERAL',
    cityId: 1,
    imageURL: ''
  })

  const handleImageUpload = (url: string) => {
    if (url) {
      setFormData(prev => ({
        ...prev,
        imageURL: url
      }))
    }
  }

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('/api/cities')
        if (response.ok) {
          const data = await response.json()
          setCities(data)
          if (data.length > 0) {
            setFormData(prev => ({ ...prev, cityId: data[0].id }))
          }
        }
      } catch (error) {
        console.error('Error fetching cities:', error)
      }
    }

    fetchCities()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString(),
        }),
      })

      if (response.ok) {
        router.push('/admin')
      } else {
        alert('Failed to add event')
      }
    } catch (error) {
      console.error('Error adding event:', error)
      alert('Failed to add event')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 hover:bg-gray-200 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Add New Event</h1>
            <p className="text-gray-600">Create a new event for your organization</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Event Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Event Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-900 text-black font-medium"
                  placeholder="Enter event name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Event Type *
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black font-medium"
                >
                  <option value="GENERAL">General</option>
                  <option value="ADOPTION_DRIVE">Adoption Drive</option>
                  <option value="HEALTH_CAMP">Health Camp</option>
                  <option value="AWARENESS_CAMPAIGN">Awareness Campaign</option>
                  <option value="FUNDRAISING">Fundraising</option>
                  <option value="VOLUNTEER_TRAINING">Volunteer Training</option>
                  <option value="COMMUNITY_OUTREACH">Community Outreach</option>
                  <option value="ENVIRONMENTAL">Environmental</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-900 text-black font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  City *
                </label>
                <select
                  value={formData.cityId}
                  onChange={(e) => setFormData({ ...formData, cityId: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black font-medium"
                >
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}, {city.state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-900 text-black font-medium"
                  placeholder="Enter event location"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Event Description *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none placeholder-gray-900 text-black font-medium"
                  placeholder="Describe the event, what participants need to bring, contact information, requirements, etc."
                />
                <p className="text-sm text-gray-500 mt-2">
                  Include all important details like requirements, contact info, what to bring, etc.
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Event Image (Optional)
                </label>
                <ImageUpload onImageUpload={handleImageUpload} type="event" />
                {formData.imageURL && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Uploaded Image:</p>
                    <img 
                      src={formData.imageURL} 
                      alt="Event preview" 
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
