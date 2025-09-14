interface StatisticsProps {
  totalAnimals: number
  totalCities: number
}

export default function Statistics({ totalAnimals, totalCities }: StatisticsProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Together, we're making a difference in the lives of animals across India
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">
              {totalAnimals}+
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Animals in Care
            </h3>
            <p className="text-gray-600">
              Currently providing shelter and medical care
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">
              {totalCities}+
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Cities Served
            </h3>
            <p className="text-gray-600">
              Expanding our reach across India
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">
              24/7
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Emergency Rescue
            </h3>
            <p className="text-gray-600">
              Round-the-clock rescue services
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">
              100%
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Volunteer Run
            </h3>
            <p className="text-gray-600">
              Powered by passionate volunteers
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
