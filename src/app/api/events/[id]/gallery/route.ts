import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const eventId = parseInt(id)

    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      )
    }

    const gallery = await prisma.eventGallery.findMany({
      where: { eventId },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(gallery)
  } catch (error) {
    console.error('Error fetching event gallery:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const eventId = parseInt(id)
    const { mediaType, url, caption, altText, isFeatured, order } = await request.json()

    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!mediaType || !url) {
      return NextResponse.json(
        { error: 'Media type and URL are required' },
        { status: 400 }
      )
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    const galleryItem = await prisma.eventGallery.create({
      data: {
        eventId,
        mediaType,
        url,
        caption: caption || null,
        altText: altText || null,
        isFeatured: isFeatured || false,
        order: order || 0
      }
    })

    return NextResponse.json(galleryItem)
  } catch (error) {
    console.error('Error creating gallery item:', error)
    return NextResponse.json(
      { error: 'Failed to create gallery item' },
      { status: 500 }
    )
  }
}
