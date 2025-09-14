'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Heart, MapPin } from 'lucide-react'
import { useCity } from '@/context/CityContext'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { selectedCity, setSelectedCity, cities } = useCity()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Animals', href: '/animals' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
    { name: 'Donate', href: '/donate' },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="/images/logo/logo.jpg" 
              alt="Rescue and Rehab Foundation" 
              className="h-8 w-8 rounded-full object-cover"
              onError={(e) => {
                // Fallback to icon if image fails to load
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <Heart className="h-8 w-8 text-teal-500 hidden" />
            <span className="text-xl font-bold text-gray-800">
              Rescue & Rehab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-teal-500 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* City Selector */}
          <div className="hidden md:flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <select
              value={selectedCity?.id || ''}
              onChange={(e) => {
                const cityId = parseInt(e.target.value)
                const city = cities.find(c => c.id === cityId)
                setSelectedCity(city || null)
              }}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}, {city.state}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-teal-500 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile City Selector */}
              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                <MapPin className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedCity?.id || ''}
                  onChange={(e) => {
                    const cityId = parseInt(e.target.value)
                    const city = cities.find(c => c.id === cityId)
                    setSelectedCity(city || null)
                  }}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}, {city.state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
