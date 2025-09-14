import { Heart, Users, MapPin, Calendar, Award, Target } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            About <span className="text-orange-300">Rescue and Rehab Foundation</span>
          </h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto">
            We are a dedicated team of animal lovers working tirelessly to rescue, 
            rehabilitate, and rehome animals in need across India.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Rescue and Rehab Foundation was born out of a simple yet powerful belief: 
                every animal deserves love, care, and a chance at a better life. Founded in 
                Navsari, Gujarat, our organization has grown from a small group of passionate 
                volunteers to a comprehensive animal welfare organization.
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our journey began with the Julie Charitable Trust, a local dog shelter that 
                has been serving the community for years. Recognizing the need for a more 
                comprehensive approach to animal welfare, we expanded our mission to include 
                not just dogs, but cows, birds, and other animals in need.
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Today, we operate multiple shelters and have plans to expand to other cities 
                across India. Our multi-city approach allows us to reach more animals and 
                communities, creating a network of care and compassion that spans the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Target className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To rescue, rehabilitate, and rehome animals in need while promoting 
                responsible pet ownership and animal welfare awareness in our communities. 
                We believe in creating a world where every animal is treated with compassion, 
                dignity, and respect.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To build a compassionate society where no animal suffers from neglect, 
                abuse, or abandonment. We envision a future where every animal has access 
                to proper care, medical treatment, and loving homes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Compassion</h3>
              <p className="text-gray-600">
                We treat every animal with love, kindness, and understanding, 
                recognizing their inherent worth and dignity.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Community</h3>
              <p className="text-gray-600">
                We believe in the power of community and work together with 
                volunteers, donors, and supporters to achieve our goals.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for the highest standards in animal care, medical treatment, 
                and organizational management.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Impact</h3>
              <p className="text-gray-600">
                We measure our success by the number of lives we save and the 
                positive change we create in our communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Julie Charitable Trust */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Julie Charitable Trust</h2>
              <p className="text-xl text-gray-600">
                Our foundation and the heart of our operations
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Foundation</h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    The Julie Charitable Trust serves as the cornerstone of our operations in Navsari, Gujarat. 
                    This registered trust has been providing shelter, medical care, and rehabilitation services 
                    for dogs and other animals for many years.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    The trust operates with full transparency and accountability, ensuring that every donation 
                    and resource is used effectively to help animals in need. Our registration and compliance 
                    with local regulations demonstrate our commitment to responsible operations.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-4 mt-1">
                      <MapPin className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Location</h4>
                      <p className="text-gray-600">Navsari, Gujarat, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-4 mt-1">
                      <Calendar className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Established</h4>
                      <p className="text-gray-600">Serving the community for years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-4 mt-1">
                      <Award className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Registration</h4>
                      <p className="text-gray-600">Registered charitable trust</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the passionate individuals who make our mission possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Volunteers</h3>
              <p className="text-gray-600">
                Our dedicated volunteers are the backbone of our organization, 
                providing daily care, love, and attention to our rescued animals.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Veterinarians</h3>
              <p className="text-gray-600">
                Professional veterinarians provide medical care, surgeries, 
                and health checkups for all our rescued animals.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Administrative Team</h3>
              <p className="text-gray-600">
                Our administrative team manages operations, fundraising, 
                and ensures the smooth running of our organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Mission
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Together, we can create a better world for animals. 
            Whether through donations, volunteering, or adoption, 
            your support makes a real difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <Users className="mr-2 h-5 w-5" />
              Volunteer
            </a>
            <a
              href="/animals"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Adopt
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
