'use client'

import { useState, useEffect } from 'react'
import { useCity } from '@/context/CityContext'
import { Bird, Heart, MapPin, Calendar } from 'lucide-react'

interface Animal {
  id: number
  name: string
  age: number | null
  story: string
  imageURL: string[]
  shelter: {
    name: string
    city: {
      name: string
      state: string
    }
  }
}

export default function BirdsPage() {
  const { selectedCity } = useCity()
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBirds = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams({
          type: 'BIRD',
          isAvailable: 'true'
        })
        
        if (selectedCity) {
          params.append('cityId', selectedCity.id.toString())
        }

        const response = await fetch(`/api/animals?${params}`)
        if (response.ok) {
          const data = await response.json()
          setAnimals(data)
        }
      } catch (error) {
        console.error('Error fetching birds:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBirds()
  }, [selectedCity])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Bird className="h-16 w-16" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Our <span className="text-red-500">Rescued Birds</span>
          </h1>
          <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
            These beautiful birds have been rescued from various situations and are now 
            ready to spread their wings in loving homes.
          </p>
        </div>
      </section>

      {/* Filter Info */}
      {selectedCity && (
        <section className="py-4 bg-yellow-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center text-yellow-800">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Showing birds available in {selectedCity.name}, {selectedCity.state}</span>
            </div>
          </div>
        </section>
      )}

      {/* Birds Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading our feathered friends...</p>
            </div>
          ) : animals.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Available Birds ({animals.length})
                </h2>
                <p className="text-gray-600">
                  Click on any bird to learn more about them
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {animals.map((bird) => (
                  <div key={bird.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="h-64 bg-gray-200 relative">
                      {bird.imageURL.length > 0 ? (
                        <img
                          src={bird.imageURL[0]}
                          alt={bird.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Bird className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2">
                        <Heart className="h-5 w-5 text-red-500" />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-800">{bird.name}</h3>
                        {bird.age && (
                          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                            {bird.age} years old
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {bird.story}
                      </p>
                      
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{bird.shelter.city.name}, {bird.shelter.city.state}</span>
                      </div>
                      
                      <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                        Learn More & Adopt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Bird className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No birds available
              </h3>
              <p className="text-gray-500 mb-6">
                {selectedCity 
                  ? `No birds are currently available for adoption in ${selectedCity.name}.`
                  : 'No birds are currently available for adoption.'
                }
              </p>
              <p className="text-gray-500">
                Check back soon or contact us to be notified when new birds arrive.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bird Care Information */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Bird Adoption Guidelines
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Birds make wonderful companions, but they require special care and attention. 
              Here's what you need to know before adopting.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Housing Requirements</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Appropriate cage size for the bird species</li>
                  <li>• Safe, non-toxic materials</li>
                  <li>• Proper perches and toys</li>
                  <li>• Clean, well-ventilated environment</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Diet & Nutrition</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Species-appropriate diet</li>
                  <li>• Fresh fruits and vegetables</li>
                  <li>• Clean water daily</li>
                  <li>• Avoid toxic foods</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Social Needs</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Daily interaction and attention</li>
                  <li>• Mental stimulation</li>
                  <li>• Safe socialization</li>
                  <li>• Understanding bird behavior</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Health Care</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Regular veterinary checkups</li>
                  <li>• Watch for signs of illness</li>
                  <li>• Proper grooming</li>
                  <li>• Emergency care plan</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Commitment</h3>
              <p className="text-gray-600">
                Birds can live for many years and require a long-term commitment. 
                Please ensure you're ready for this responsibility before adopting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Adopt a Bird?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            If you're ready to provide a loving home for a rescued bird, 
            contact us to start the adoption process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <Heart className="mr-2 h-5 w-5" />
              Contact Us
            </a>
            <a
              href="/animals"
              className="bg-transparent border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Browse Other Animals
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
