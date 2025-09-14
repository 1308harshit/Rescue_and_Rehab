'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface City {
  id: number
  name: string
  state: string
  country: string
}

interface CityContextType {
  selectedCity: City | null
  setSelectedCity: (city: City | null) => void
  cities: City[]
  setCities: (cities: City[]) => void
}

const CityContext = createContext<CityContextType | undefined>(undefined)

export function CityProvider({ children }: { children: React.ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [cities, setCities] = useState<City[]>([])

  // Load cities from API on mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('/api/cities')
        if (response.ok) {
          const citiesData = await response.json()
          setCities(citiesData)
          // Set default city to Navsari if available
          const navsari = citiesData.find((city: City) => city.name === 'Navsari')
          if (navsari) {
            setSelectedCity(navsari)
          }
        }
      } catch (error) {
        console.error('Failed to fetch cities:', error)
        // Fallback to Navsari if API fails
        const fallbackCity: City = {
          id: 1,
          name: 'Navsari',
          state: 'Gujarat',
          country: 'India'
        }
        setCities([fallbackCity])
        setSelectedCity(fallbackCity)
      }
    }

    fetchCities()
  }, [])

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity, cities, setCities }}>
      {children}
    </CityContext.Provider>
  )
}

export function useCity() {
  const context = useContext(CityContext)
  if (context === undefined) {
    throw new Error('useCity must be used within a CityProvider')
  }
  return context
}
