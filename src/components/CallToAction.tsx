'use client'

import Link from 'next/link'
import { Heart, Users, DollarSign } from 'lucide-react'

export default function CallToAction() {
  return (
    <section className="py-16 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Make a Difference Today
          </h2>
          <p className="text-xl mb-12 text-teal-100">
            Every contribution, no matter how small, helps us save more lives and create a better world for animals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <DollarSign className="h-12 w-12 text-orange-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Donate</h3>
              <p className="text-gray-700 mb-4">
                Support our rescue operations, medical care, and daily needs
              </p>
              <Link
                href="/donate"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Donate Now
              </Link>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <Users className="h-12 w-12 text-orange-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Volunteer</h3>
              <p className="text-gray-700 mb-4">
                Join our team of dedicated volunteers and make a hands-on impact
              </p>
              <Link
                href="/contact"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Get Involved
              </Link>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <Heart className="h-12 w-12 text-orange-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Adopt</h3>
              <p className="text-gray-700 mb-4">
                Give a loving home to a rescued animal and change their life forever
              </p>
              <Link
                href="/animals"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Browse Animals
              </Link>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Follow Our Journey
            </h3>
            <p className="text-gray-700 mb-6">
              Stay updated with our latest rescues, adoptions, and events on social media
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.instagram.com/rescueteamnvs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-4 rounded-full transition-all duration-300 transform hover:scale-110"
                title="Follow us on Instagram"
              >
                <img 
                  src="/images/social/instagram.png" 
                  alt="Instagram" 
                  className="h-8 w-8"
                />
              </a>
              <a
                href="https://facebook.com/rescueandrehab"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-4 rounded-full transition-all duration-300 transform hover:scale-110"
                title="Follow us on Facebook"
              >
                <img 
                  src="/images/social/facebook.png" 
                  alt="Facebook" 
                  className="h-8 w-8"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
