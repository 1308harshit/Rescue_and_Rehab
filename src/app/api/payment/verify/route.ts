import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { sendDonationNotificationEmail, sendDonationReceiptEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, donor_name, donor_email, donor_phone } = await request.json()

    // Verify the payment signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex')

    const isAuthentic = expectedSignature === razorpay_signature

    if (!isAuthentic) {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      )
    }

    // Save donation to database
    const donation = await prisma.donation.create({
      data: {
        amount: amount,
        donorName: donor_name || 'Anonymous',
        donorEmail: donor_email || null,
        donorPhone: donor_phone || null,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        status: 'COMPLETED',
        purpose: 'General Donation'
      }
    })

    // Send email notifications
    const emailData = {
      donorName: donor_name || 'Anonymous',
      donorEmail: donor_email || '',
      amount: amount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id
    }

    // Send notification to admin (khatsuriyaharshit@gmail.com)
    await sendDonationNotificationEmail(emailData)

    // Send receipt to donor (if email provided)
    if (donor_email) {
      await sendDonationReceiptEmail(emailData)
    }

    return NextResponse.json({
      success: true,
      donation: {
        id: donation.id,
        amount: donation.amount,
        donorName: donation.donorName,
        paymentId: donation.paymentId
      }
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}
