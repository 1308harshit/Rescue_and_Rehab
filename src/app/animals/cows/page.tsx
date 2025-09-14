'use client'

import { useState, useEffect } from 'react'
import { useCity } from '@/context/CityContext'
import { Beef, Heart, MapPin, Calendar } from 'lucide-react'

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

export default function CowsPage() {
  const { selectedCity } = useCity()
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCows = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams({
          type: 'COW',
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
        console.error('Error fetching cows:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCows()
  }, [selectedCity])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Beef className="h-16 w-16" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Our <span className="text-yellow-300">Rescued Cows</span>
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            These gentle giants have been rescued from difficult situations and are now 
            looking for loving homes or sponsors to care for them.
          </p>
        </div>
      </section>

      {/* Filter Info */}
      {selectedCity && (
        <section className="py-4 bg-green-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center text-green-800">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Showing cows available in {selectedCity.name}, {selectedCity.state}</span>
            </div>
          </div>
        </section>
      )}

      {/* Cows Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading our gentle friends...</p>
            </div>
          ) : animals.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Available Cows ({animals.length})
                </h2>
                <p className="text-gray-600">
                  Click on any cow to learn more about them
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {animals.map((cow) => (
                  <div key={cow.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="h-64 bg-gray-200 relative">
                      {cow.imageURL.length > 0 ? (
                        <img
                          src={cow.imageURL[0]}
                          alt={cow.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Beef className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2">
                        <Heart className="h-5 w-5 text-teal-500" />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-800">{cow.name}</h3>
                        {cow.age && (
                          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                            {cow.age} years old
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {cow.story}
                      </p>
                      
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{cow.shelter.city.name}, {cow.shelter.city.state}</span>
                      </div>
                      
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                        Learn More & Adopt/Sponsor
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Beef className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No cows available
              </h3>
              <p className="text-gray-500 mb-6">
                {selectedCity 
                  ? `No cows are currently available for adoption/sponsorship in ${selectedCity.name}.`
                  : 'No cows are currently available for adoption/sponsorship.'
                }
              </p>
              <p className="text-gray-500">
                Check back soon or contact us to be notified when new cows arrive.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Sponsorship Information */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Cow Sponsorship Program
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Can't adopt a cow? Consider sponsoring one! Your monthly contribution helps 
              provide food, medical care, and shelter for our rescued cows.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Monthly Food</h3>
                <p className="text-gray-600">₹2,000/month covers nutritious feed and hay</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Medical Care</h3>
                <p className="text-gray-600">₹1,500/month for regular health checkups</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Shelter & Care</h3>
                <p className="text-gray-600">₹1,000/month for shelter maintenance</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/donate"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
              >
                <Heart className="mr-2 h-5 w-5" />
                Sponsor a Cow
              </a>
              <a
                href="/contact"
                className="bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Interested in Cow Adoption or Sponsorship?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us to learn more about our cow adoption and sponsorship programs. 
            We'll help you find the perfect way to support these gentle animals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <Heart className="mr-2 h-5 w-5" />
              Contact Us
            </a>
            <a
              href="/animals"
              className="bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Browse Other Animals
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
