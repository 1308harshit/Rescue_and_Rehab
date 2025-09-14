'use client'

import { useState } from 'react'
import { Heart, CreditCard, Shield, Users, DollarSign } from 'lucide-react'

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState('')
  const [donationType, setDonationType] = useState('one-time')
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const presetAmounts = [500, 1000, 2500, 5000, 10000]

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!donationAmount || parseFloat(donationAmount) < 1) {
      alert('Please enter a valid donation amount.')
      return
    }

    setIsProcessing(true)

    try {
      // Create Razorpay order
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(donationAmount),
          receipt: `donation_${Date.now()}`,
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Failed to create payment order')
      }

      // Load Razorpay script
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Rescue and Rehab Foundation',
          description: 'Donation for Animal Welfare',
          order_id: orderData.id,
          prefill: {
            name: donorInfo.name,
            email: donorInfo.email,
            contact: donorInfo.phone,
          },
          theme: {
            color: '#0d9488', // Teal color
          },
          handler: async function (response: any) {
            try {
              // Verify payment
              const verifyResponse = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  amount: parseFloat(donationAmount),
                  donor_name: donorInfo.name,
                  donor_email: donorInfo.email,
                  donor_phone: donorInfo.phone,
                }),
              })

              const verifyData = await verifyResponse.json()

              if (verifyData.success) {
                // Redirect to success page with donation details
                const successUrl = `/donate/success?amount=${donationAmount}&donorName=${encodeURIComponent(donorInfo.name)}&paymentId=${response.razorpay_payment_id}`
                window.location.href = successUrl
              } else {
                alert('Payment verification failed. Please contact support.')
              }
            } catch (error) {
              console.error('Payment verification error:', error)
              alert('Payment verification failed. Please contact support.')
            }
          },
          modal: {
            ondismiss: function() {
              setIsProcessing(false)
            }
          }
        }

        const rzp = new (window as any).Razorpay(options)
        rzp.open()
      }
      script.onerror = () => {
        alert('Failed to load payment gateway. Please try again.')
        setIsProcessing(false)
      }
      document.body.appendChild(script)
    } catch (error) {
      console.error('Error processing donation:', error)
      alert('There was an error processing your donation. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Make a <span className="text-orange-300">Difference</span>
          </h1>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto">
            Your donation directly supports our rescue operations, medical care, 
            and daily needs of the animals in our care.
          </p>
        </div>
      </section>

      {/* Donation Impact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              How Your Donation Helps
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every rupee makes a difference in the lives of animals in need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Medical Care</h3>
              <p className="text-gray-600">₹500 provides basic medical treatment for one animal</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Daily Food</h3>
              <p className="text-gray-600">₹1,000 feeds 10 animals for one day</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Emergency Rescue</h3>
              <p className="text-gray-600">₹2,500 covers emergency rescue and transport</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Shelter Operations</h3>
              <p className="text-gray-600">₹5,000 supports shelter maintenance for one month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Donate Now
              </h2>

              <form onSubmit={handleDonation} className="space-y-6">
                {/* Donation Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Donation Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setDonationType('one-time')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        donationType === 'one-time'
                          ? 'border-teal-600 bg-teal-50 text-teal-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">One-time</div>
                        <div className="text-sm text-gray-700">Single donation</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonationType('monthly')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        donationType === 'monthly'
                          ? 'border-teal-600 bg-teal-50 text-teal-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">Monthly</div>
                        <div className="text-sm text-gray-700">Recurring donation</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setDonationAmount(amount.toString())}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          donationAmount === amount.toString()
                            ? 'border-teal-600 bg-teal-50 text-teal-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <span className="text-gray-900">₹{amount.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                      min="1"
                    />
                  </div>
                </div>

                {/* Donor Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Your Information</h3>
                  
                  <div>
                    <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="donorName"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="donorEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="donorEmail"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="donorPhone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="donorPhone"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                      placeholder="+91-9876543210"
                    />
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  type="submit"
                  disabled={!donationAmount || isProcessing}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Donate ₹{donationAmount ? parseInt(donationAmount).toLocaleString() : '0'}
                      {donationType === 'monthly' && ' / month'}
                    </>
                  )}
                </button>
              </form>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-green-800">
                    Your donation is secure and encrypted. We use industry-standard security measures.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Other Ways to Help
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Donations aren't the only way to support our mission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Volunteer</h3>
              <p className="text-gray-600 mb-4">Give your time and skills to help animals in need</p>
              <a
                href="/contact"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Get Involved
              </a>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Adopt</h3>
              <p className="text-gray-600 mb-4">Give a loving home to a rescued animal</p>
              <a
                href="/animals"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Browse Animals
              </a>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-teal-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Spread Awareness</h3>
              <p className="text-gray-600 mb-4">Share our mission with friends and family</p>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://www.instagram.com/rescueteamnvs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full transition-colors"
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
                  className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full transition-colors"
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
        </div>
      </section>
    </div>
  )
}
