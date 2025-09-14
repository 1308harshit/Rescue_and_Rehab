'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react'

interface Animal {
  id: number
  name: string
  type: string
  age: number | null
  story: string
  isAvailable: boolean
  imageURL: string[]
  shelter: {
    name: string
    city: {
      name: string
    }
  }
}

interface Event {
  id: number
  name: string
  description: string
  date: string
  location: string
  city: {
    name: string
  }
}

export default function AdminPage() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [activeTab, setActiveTab] = useState('animals')
  const [loading, setLoading] = useState(true)
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [animalFilter, setAnimalFilter] = useState<'ALL' | 'DOG' | 'COW' | 'BIRD'>('ALL')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [animalsRes, eventsRes] = await Promise.all([
        fetch('/api/animals'),
        fetch('/api/events')
      ])
      
      if (animalsRes.ok) {
        const animalsData = await animalsRes.json()
        setAnimals(animalsData)
      }
      
      if (eventsRes.ok) {
        const eventsData = await eventsRes.json()
        setEvents(eventsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAnimal = async (id: number) => {
    if (confirm('Are you sure you want to delete this animal?')) {
      try {
        const response = await fetch(`/api/animals/${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          setAnimals(animals.filter(animal => animal.id !== id))
        }
      } catch (error) {
        console.error('Error deleting animal:', error)
      }
    }
  }

  const handleDeleteEvent = async (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`/api/events/${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          setEvents(events.filter(event => event.id !== id))
        }
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Manage animals, events, and content</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex mb-8">
          <button
            onClick={() => setActiveTab('animals')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'animals'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Animals ({animals.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'events'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Events ({events.length})
          </button>
        </div>

        {/* Animals Tab */}
        {activeTab === 'animals' && (
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Animals</h2>
                <a 
                  href="/admin/add-animal"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg inline-flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Animal
                </a>
              </div>
              
              {/* Animal Filter */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setAnimalFilter('ALL')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    animalFilter === 'ALL' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Animals
                </button>
                <button
                  onClick={() => setAnimalFilter('DOG')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    animalFilter === 'DOG' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Dogs
                </button>
                <button
                  onClick={() => setAnimalFilter('COW')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    animalFilter === 'COW' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cows
                </button>
                <button
                  onClick={() => setAnimalFilter('BIRD')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    animalFilter === 'BIRD' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Birds
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Animal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {animals
                    .filter(animal => animalFilter === 'ALL' || animal.type === animalFilter)
                    .map((animal) => (
                    <tr key={animal.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            {animal.imageURL.length > 0 ? (
                              <img src={animal.imageURL[0]} alt={animal.name} className="h-10 w-10 rounded-full object-cover" />
                            ) : (
                              <span className="text-gray-400">🐾</span>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{animal.name}</div>
                            <div className="text-sm text-gray-500">{animal.shelter.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {animal.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {animal.age ? `${animal.age} years` : 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {animal.shelter.city.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          animal.isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {animal.isAvailable ? 'Available' : 'Adopted'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => setEditingAnimal(animal)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteAnimal(animal.id)}
                            className="text-teal-600 hover:text-teal-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Events</h2>
                <a 
                  href="/admin/add-event"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </a>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{event.name}</div>
                          <div className="text-sm text-gray-500 line-clamp-2">{event.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(event.date).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {event.city.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <a
                            href={`/events/${event.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900"
                            title="View Event"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                          <a
                            href={`/admin/events/${event.id}/article`}
                            className="text-green-600 hover:text-green-900"
                            title="Edit Article"
                          >
                            <Edit className="h-4 w-4" />
                          </a>
                          <a
                            href={`/admin/events/${event.id}/gallery`}
                            className="text-purple-600 hover:text-purple-900"
                            title="Manage Gallery"
                          >
                            <Plus className="h-4 w-4" />
                          </a>
                          <button 
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Event"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
