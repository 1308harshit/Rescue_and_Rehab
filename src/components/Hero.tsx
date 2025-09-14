'use client'

import Link from 'next/link'
import { Heart, Users, Calendar } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display mb-6 leading-tight">
            Rescue, Rehabilitate, and
            <span className="text-orange-300"> Rehome</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-teal-100">
            Join us in our mission to provide love, care, and forever homes for animals in need across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors inline-flex items-center justify-center"
            >
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-teal-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors inline-flex items-center justify-center"
            >
              <Users className="mr-2 h-5 w-5" />
              Volunteer
            </Link>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="relative bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">500+</h3>
              <p className="text-gray-600">Animals Rescued</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">200+</h3>
              <p className="text-gray-600">Happy Adoptions</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">50+</h3>
              <p className="text-gray-600">Events Organized</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
