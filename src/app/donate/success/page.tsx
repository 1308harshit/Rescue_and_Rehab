'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Heart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DonationSuccessPage() {
  const searchParams = useSearchParams()
  const [donationDetails, setDonationDetails] = useState<{
    amount: string | null;
    donorName: string | null;
    paymentId: string | null;
  } | null>(null)

  useEffect(() => {
    // Get donation details from URL params or localStorage
    const amount = searchParams.get('amount')
    const donorName = searchParams.get('donorName')
    const paymentId = searchParams.get('paymentId')

    if (amount || donorName || paymentId) {
      setDonationDetails({
        amount,
        donorName,
        paymentId
      })
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Donation!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Your generous contribution will help us rescue, rehabilitate, and find loving homes for animals in need.
          </p>

          {/* Donation Details */}
          {donationDetails && (
            <div className="bg-teal-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Donation Details</h3>
              <div className="space-y-2 text-gray-700">
                {donationDetails.donorName && (
                  <p><span className="font-medium">Donor:</span> {donationDetails.donorName}</p>
                )}
                {donationDetails.amount && (
                  <p><span className="font-medium">Amount:</span> ₹{donationDetails.amount}</p>
                )}
                {donationDetails.paymentId && (
                  <p><span className="font-medium">Transaction ID:</span> {donationDetails.paymentId}</p>
                )}
              </div>
            </div>
          )}

          {/* Impact Message */}
          <div className="bg-orange-50 rounded-lg p-6 mb-8">
            <div className="flex justify-center mb-4">
              <Heart className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Impact</h3>
            <p className="text-gray-600">
              Your donation helps us provide food, medical care, and shelter for rescued animals. 
              Every contribution makes a difference in their lives.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <Link
              href="/animals"
              className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              <Heart className="h-5 w-5 mr-2" />
              Meet Our Animals
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              You will receive a receipt via email shortly. For any questions about your donation, 
              please contact us at <a href="mailto:info@rescueandrehab.org" className="text-teal-600 hover:underline">info@rescueandrehab.org</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
