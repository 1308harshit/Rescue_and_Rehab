'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, Eye, Save, X, LogOut } from 'lucide-react'

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

interface Volunteer {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  city: string
  message?: string
  appliedAt: string
}

interface CoreMember {
  id: number
  firstName: string
  lastName: string
  role: string
  bio?: string
  imageURL?: string
  email?: string
  phone?: string
  isActive: boolean
  displayOrder: number
}

export default function AdminPage() {
  const router = useRouter()
  const [animals, setAnimals] = useState<Animal[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [coreMembers, setCoreMembers] = useState<CoreMember[]>([])
  const [activeTab, setActiveTab] = useState('animals')
  const [loading, setLoading] = useState(true)
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [animalFilter, setAnimalFilter] = useState<'ALL' | 'DOG' | 'COW' | 'BIRD'>('ALL')
  const [volunteerFilter, setVolunteerFilter] = useState<'ALL' | 'CORE' | 'REGULAR'>('ALL')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [animalsRes, eventsRes, volunteersRes, coreMembersRes] = await Promise.all([
        fetch('/api/animals'),
        fetch('/api/events'),
        fetch('/api/volunteer'),
        fetch('/api/core-members')
      ])
      
      if (animalsRes.ok) {
        const animalsData = await animalsRes.json()
        setAnimals(animalsData)
      }
      
      if (eventsRes.ok) {
        const eventsData = await eventsRes.json()
        setEvents(eventsData)
      }

      if (volunteersRes.ok) {
        const volunteersData = await volunteersRes.json()
        setVolunteers(volunteersData)
      }

      if (coreMembersRes.ok) {
        const coreMembersData = await coreMembersRes.json()
        setCoreMembers(coreMembersData)
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

  const handlePromoteToCoreMember = async (volunteer: Volunteer) => {
    if (confirm(`Promote ${volunteer.firstName} ${volunteer.lastName} to Core Member?`)) {
      try {
        const response = await fetch('/api/core-members', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: volunteer.firstName,
            lastName: volunteer.lastName,
            role: 'Contributor',
            bio: volunteer.message || 'Core team member',
            email: volunteer.email,
            phone: volunteer.phone,
            displayOrder: coreMembers.length + 1
          }),
        })

        if (response.ok) {
          const newCoreMember = await response.json()
          setCoreMembers([...coreMembers, newCoreMember])
          alert('Volunteer promoted to Core Member successfully!')
        } else {
          alert('Failed to promote volunteer')
        }
      } catch (error) {
        console.error('Error promoting volunteer:', error)
        alert('Failed to promote volunteer')
      }
    }
  }

  const handleRemoveVolunteer = async (id: number) => {
    if (confirm('Are you sure you want to remove this volunteer?')) {
      try {
        const response = await fetch(`/api/volunteer/${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          setVolunteers(volunteers.filter(volunteer => volunteer.id !== id))
        }
      } catch (error) {
        console.error('Error removing volunteer:', error)
      }
    }
  }

  const handleDeleteCoreMember = async (id: number) => {
    if (confirm('Are you sure you want to delete this core member?')) {
      try {
        const response = await fetch(`/api/core-members/${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          setCoreMembers(coreMembers.filter(member => member.id !== id))
        }
      } catch (error) {
        console.error('Error deleting core member:', error)
        alert('Failed to delete core member')
      }
    }
  }

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST'
        })
        router.push('/admin/login')
      } catch (error) {
        console.error('Logout error:', error)
        // Still redirect even if logout fails
        router.push('/admin/login')
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Panel</h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage animals, events, and content</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-flex items-center justify-center w-full sm:w-auto"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row mb-6 sm:mb-8 space-y-2 sm:space-y-0 sm:space-x-0">
          <button
            onClick={() => setActiveTab('animals')}
            className={`px-4 sm:px-6 py-3 font-medium transition-colors text-sm sm:text-base ${
              activeTab === 'animals'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Animals ({animals.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 sm:px-6 py-3 font-medium transition-colors text-sm sm:text-base ${
              activeTab === 'events'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Events ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('volunteers')}
            className={`px-4 sm:px-6 py-3 font-medium transition-colors text-sm sm:text-base ${
              activeTab === 'volunteers'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Volunteers ({volunteers.length})
          </button>
          <button
            onClick={() => setActiveTab('core-members')}
            className={`px-4 sm:px-6 py-3 font-medium transition-colors text-sm sm:text-base ${
              activeTab === 'core-members'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Core Members ({coreMembers.length})
          </button>
        </div>

        {/* Animals Tab */}
        {activeTab === 'animals' && (
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-4 sm:p-6 border-b">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-4 sm:space-y-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Animals</h2>
                <a 
                  href="/admin/add-animal"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg inline-flex items-center justify-center w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Animal
                </a>
              </div>
              
              {/* Animal Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setAnimalFilter('ALL')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium ${
                    animalFilter === 'ALL' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Animals
                </button>
                <button
                  onClick={() => setAnimalFilter('DOG')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium ${
                    animalFilter === 'DOG' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Dogs
                </button>
                <button
                  onClick={() => setAnimalFilter('COW')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium ${
                    animalFilter === 'COW' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cows
                </button>
                <button
                  onClick={() => setAnimalFilter('BIRD')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium ${
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
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Animal</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Type</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Age</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Location</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {animals
                    .filter(animal => animalFilter === 'ALL' || animal.type === animalFilter)
                    .map((animal) => (
                    <tr key={animal.id}>
                      <td className="px-3 sm:px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                            {animal.imageURL.length > 0 ? (
                              <img src={animal.imageURL[0]} alt={animal.name} className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover" />
                            ) : (
                              <span className="text-gray-400 text-xs sm:text-sm">🐾</span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 truncate">{animal.name}</div>
                            <div className="text-xs sm:text-sm text-gray-500 truncate">{animal.shelter.name}</div>
                            <div className="text-xs text-gray-400 sm:hidden">
                              {animal.type} • {animal.age ? `${animal.age}y` : 'Unknown'} • {animal.shelter.city.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {animal.type}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        {animal.age ? `${animal.age} years` : 'Unknown'}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                        {animal.shelter.city.name}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          animal.isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {animal.isAvailable ? 'Available' : 'Adopted'}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-1 sm:space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1">
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                          <button 
                            onClick={() => setEditingAnimal(animal)}
                            className="text-yellow-600 hover:text-yellow-900 p-1"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteAnimal(animal.id)}
                            className="text-teal-600 hover:text-teal-900 p-1"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
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
            <div className="p-4 sm:p-6 border-b">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Events</h2>
                <a 
                  href="/admin/add-event"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-flex items-center justify-center w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </a>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Location</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">City</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td className="px-3 sm:px-6 py-4">
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900 truncate">{event.name}</div>
                          <div className="text-xs sm:text-sm text-gray-500 line-clamp-2">{event.description}</div>
                          <div className="text-xs text-gray-400 sm:hidden mt-1">
                            {new Date(event.date).toLocaleDateString('en-IN')} • {event.location} • {event.city.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                        {new Date(event.date).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        {event.location}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                        {event.city.name}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-1 sm:space-x-2">
                          <a
                            href={`/events/${event.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View Event"
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </a>
                          <a
                            href={`/admin/events/${event.id}/article`}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Edit Article"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </a>
                          <a
                            href={`/admin/events/${event.id}/gallery`}
                            className="text-purple-600 hover:text-purple-900 p-1"
                            title="Manage Gallery"
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </a>
                          <button 
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Event"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
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

        {/* Volunteers Tab */}
        {activeTab === 'volunteers' && (
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-4 sm:p-6 border-b">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-4 sm:space-y-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Volunteers</h2>
              </div>
              
              {/* Volunteer Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setVolunteerFilter('ALL')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium ${
                    volunteerFilter === 'ALL' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Volunteers
                </button>
                <button
                  onClick={() => setVolunteerFilter('CORE')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium ${
                    volunteerFilter === 'CORE' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Core Members
                </button>
                <button
                  onClick={() => setVolunteerFilter('REGULAR')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium ${
                    volunteerFilter === 'REGULAR' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Regular Volunteers
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Phone</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">City</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Applied</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {volunteers
                    .filter(volunteer => {
                      if (volunteerFilter === 'ALL') return true
                      if (volunteerFilter === 'CORE') {
                        return coreMembers.some(member => 
                          member.firstName === volunteer.firstName && 
                          member.lastName === volunteer.lastName
                        )
                      }
                      if (volunteerFilter === 'REGULAR') {
                        return !coreMembers.some(member => 
                          member.firstName === volunteer.firstName && 
                          member.lastName === volunteer.lastName
                        )
                      }
                      return true
                    })
                    .map((volunteer) => (
                    <tr key={volunteer.id}>
                      <td className="px-3 sm:px-6 py-4">
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {volunteer.firstName} {volunteer.lastName}
                          </div>
                          <div className="text-xs text-gray-400 sm:hidden">
                            {volunteer.email} • {volunteer.phone || 'N/A'} • {volunteer.city} • {new Date(volunteer.appliedAt).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                        {volunteer.email}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        {volunteer.phone || 'N/A'}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                        {volunteer.city}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                        {new Date(volunteer.appliedAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-1 sm:space-x-2">
                          <button 
                            onClick={() => handlePromoteToCoreMember(volunteer)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Promote to Core Member"
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                          <button 
                            onClick={() => handleRemoveVolunteer(volunteer.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Remove Volunteer"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
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

        {/* Core Members Tab */}
        {activeTab === 'core-members' && (
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-4 sm:p-6 border-b">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Core Members</h2>
                <a 
                  href="/admin/add-core-member"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg inline-flex items-center justify-center w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Core Member
                </a>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Role</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coreMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="px-3 sm:px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                            {member.imageURL ? (
                              <img src={member.imageURL} alt={`${member.firstName} ${member.lastName}`} className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover" />
                            ) : (
                              <span className="text-gray-400 text-xs sm:text-sm">
                                {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {member.firstName} {member.lastName}
                            </div>
                            {member.bio && (
                              <div className="text-xs sm:text-sm text-gray-500 line-clamp-1 truncate">
                                {member.bio}
                              </div>
                            )}
                            <div className="text-xs text-gray-400 sm:hidden">
                              {member.role} • {member.email || 'N/A'} • {member.phone || 'N/A'} • {member.isActive ? 'Active' : 'Inactive'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {member.role}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                        <div className="truncate">{member.email || 'N/A'}</div>
                        <div className="text-gray-500 truncate">{member.phone || 'N/A'}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          member.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {member.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-1 sm:space-x-2">
                          <button 
                            onClick={() => {
                              window.location.href = `/admin/edit-core-member/${member.id}`
                            }}
                            className="text-yellow-600 hover:text-yellow-900 p-1"
                            title="Edit Member"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteCoreMember(member.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Member"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
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
