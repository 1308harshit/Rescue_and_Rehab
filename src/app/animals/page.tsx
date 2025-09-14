import Link from 'next/link'
import { Heart, PawPrint, Bird, Beef } from 'lucide-react'

export default function AnimalsPage() {
  const animalTypes = [
    {
      type: 'dogs',
      title: 'Dogs',
      description: 'Find your perfect canine companion from our rescued dogs',
      icon: PawPrint,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      count: '25+ Available'
    },
    {
      type: 'cows',
      title: 'Cows',
      description: 'Adopt or sponsor a rescued cow and give them a loving home',
      icon: Beef,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      count: '15+ Available'
    },
    {
      type: 'birds',
      title: 'Birds',
      description: 'Beautiful rescued birds looking for their forever homes',
      icon: Bird,
      color: 'from-yellow-500 to-yellow-600',
      hoverColor: 'hover:from-yellow-600 hover:to-yellow-700',
      count: '10+ Available'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Our <span className="text-orange-300">Rescued Animals</span>
          </h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto">
            Every animal has a story. Every story deserves a happy ending. 
            Browse our rescued animals and find your perfect companion.
          </p>
        </div>
      </section>

      {/* Animal Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Choose Your Companion
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each animal is unique and special. Find the one that matches your heart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {animalTypes.map((animal) => {
              const IconComponent = animal.icon
              return (
                <Link
                  key={animal.type}
                  href={`/animals/${animal.type}`}
                  className={`group bg-gradient-to-br ${animal.color} ${animal.hoverColor} text-white rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                >
                  <div className="text-center">
                    <div className="bg-white bg-opacity-20 rounded-full p-4 w-20 h-20 mx-auto mb-6 group-hover:bg-opacity-30 transition-all">
                      <IconComponent className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{animal.title}</h3>
                    <p className="text-white text-opacity-90 mb-4">
                      {animal.description}
                    </p>
                    <div className="bg-white bg-opacity-20 rounded-full px-4 py-2 inline-block">
                      <span className="font-semibold">{animal.count}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Adoption Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Adoption Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our adoption process is designed to ensure the best match between you and your new companion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Browse</h3>
              <p className="text-gray-600">Look through our available animals and find the one that speaks to your heart.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-teal-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact</h3>
              <p className="text-gray-600">Reach out to us to express your interest and ask any questions.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-teal-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Meet</h3>
              <p className="text-gray-600">Visit our shelter to meet your potential new family member in person.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-teal-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Adopt</h3>
              <p className="text-gray-600">Complete the adoption process and welcome your new companion home!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Every adoption saves a life and creates space for us to rescue another animal in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <Heart className="mr-2 h-5 w-5" />
              Start Adoption Process
            </Link>
            <Link
              href="/donate"
              className="bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Support Our Mission
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
