import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { CityProvider } from '@/context/CityContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rescue and Rehab Foundation - Animal Welfare NGO',
  description: 'Rescue and Rehab Foundation is dedicated to rescuing, rehabilitating, and finding loving homes for animals in need. Based in Navsari, Gujarat with plans to expand across India.',
  keywords: 'animal rescue, NGO, Navsari, Gujarat, animal welfare, adoption, volunteering, donations',
  authors: [{ name: 'Rescue and Rehab Foundation' }],
  openGraph: {
    title: 'Rescue and Rehab Foundation - Animal Welfare NGO',
    description: 'Dedicated to rescuing, rehabilitating, and finding loving homes for animals in need.',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CityProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Rescue and Rehab Foundation</h3>
                  <p className="text-gray-300">
                    Dedicated to rescuing, rehabilitating, and finding loving homes for animals in need.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                    <li><a href="/animals/dogs" className="hover:text-white transition-colors">Adopt a Dog</a></li>
                    <li><a href="/animals/cows" className="hover:text-white transition-colors">Adopt a Cow</a></li>
                    <li><a href="/animals/birds" className="hover:text-white transition-colors">Adopt a Bird</a></li>
                    <li><a href="/events" className="hover:text-white transition-colors">Events</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Contact</h4>
                  <div className="text-gray-300 space-y-2 mb-4">
                    <p>📧 info@rescueandrehab.org</p>
                    <p>📱 +91-9876543210</p>
                    <p>📍 Navsari, Gujarat, India</p>
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.instagram.com/rescueteamnvs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
                      title="Follow us on Instagram"
                    >
                      <img 
                        src="/images/social/instagram.png" 
                        alt="Instagram" 
                        className="h-6 w-6"
                      />
                    </a>
                    <a
                      href="https://facebook.com/rescueandrehab"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
                      title="Follow us on Facebook"
                    >
                      <img 
                        src="/images/social/facebook.png" 
                        alt="Facebook" 
                        className="h-6 w-6"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                <p>&copy; 2024 Rescue and Rehab Foundation. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </CityProvider>
      </body>
    </html>
  )
}
