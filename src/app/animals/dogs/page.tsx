'use client'

import { useState, useEffect } from 'react'
import { useCity } from '@/context/CityContext'
import { PawPrint, Heart, MapPin, Calendar } from 'lucide-react'

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

export default function DogsPage() {
  const { selectedCity } = useCity()
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams({
          type: 'DOG',
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
        console.error('Error fetching dogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDogs()
  }, [selectedCity])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <PawPrint className="h-16 w-16" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Our <span className="text-yellow-300">Rescued Dogs</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Each dog has a unique personality and story. Find your perfect canine companion 
            and give them the loving home they deserve.
          </p>
        </div>
      </section>

      {/* Filter Info */}
      {selectedCity && (
        <section className="py-4 bg-blue-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center text-blue-800">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Showing dogs available in {selectedCity.name}, {selectedCity.state}</span>
            </div>
          </div>
        </section>
      )}

      {/* Dogs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading our furry friends...</p>
            </div>
          ) : animals.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Available Dogs ({animals.length})
                </h2>
                <p className="text-gray-600">
                  Click on any dog to learn more about them
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {animals.map((dog) => (
                  <div key={dog.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="h-64 bg-gray-200 relative">
                      {dog.imageURL.length > 0 ? (
                        <img
                          src={dog.imageURL[0]}
                          alt={dog.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <PawPrint className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2">
                        <Heart className="h-5 w-5 text-red-500" />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-800">{dog.name}</h3>
                        {dog.age && (
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                            {dog.age} years old
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {dog.story}
                      </p>
                      
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{dog.shelter.city.name}, {dog.shelter.city.state}</span>
                      </div>
                      
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                        Learn More & Adopt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <PawPrint className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No dogs available
              </h3>
              <p className="text-gray-500 mb-6">
                {selectedCity 
                  ? `No dogs are currently available for adoption in ${selectedCity.name}.`
                  : 'No dogs are currently available for adoption.'
                }
              </p>
              <p className="text-gray-500">
                Check back soon or contact us to be notified when new dogs arrive.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Don't See Your Perfect Match?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            New dogs arrive regularly. Contact us to be added to our waiting list 
            or to learn about upcoming arrivals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <Heart className="mr-2 h-5 w-5" />
              Contact Us
            </a>
            <a
              href="/animals"
              className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Browse Other Animals
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
