import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendVolunteerNotificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, city, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save volunteer application to database
    const volunteerApplication = await prisma.volunteerApplication.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        city,
        message: message || null,
      },
    })

    // Send email notification
    const emailData = {
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      city,
      message: message || undefined,
    }

    try {
      await sendVolunteerNotificationEmail(emailData)
    } catch (emailError) {
      console.error('Error sending volunteer notification email:', emailError)
      // Don't fail the request if email fails, just log the error
    }

    return NextResponse.json(
      { message: 'Volunteer application submitted successfully', id: volunteerApplication.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing volunteer application:', error)
    return NextResponse.json(
      { error: 'Failed to submit volunteer application' },
      { status: 500 }
    )
  }
}
