import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendContactNotificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save contact submission to database
    const contactSubmission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
      },
    })

    // Send email notification
    const emailData = {
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
    }

    try {
      await sendContactNotificationEmail(emailData)
    } catch (emailError) {
      console.error('Error sending contact notification email:', emailError)
      // Don't fail the request if email fails, just log the error
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully', id: contactSubmission.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
