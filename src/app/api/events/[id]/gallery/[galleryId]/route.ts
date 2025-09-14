import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; galleryId: string }> }
) {
  try {
    const { id, galleryId: galleryIdParam } = await params
    const eventId = parseInt(id)
    const galleryId = parseInt(galleryIdParam)
    const { mediaType, url, caption, altText, isFeatured, order } = await request.json()

    if (isNaN(eventId) || isNaN(galleryId)) {
      return NextResponse.json(
        { error: 'Invalid event ID or gallery ID' },
        { status: 400 }
      )
    }

    const updatedItem = await prisma.eventGallery.update({
      where: { 
        id: galleryId,
        eventId: eventId // Ensure the gallery item belongs to the event
      },
      data: {
        mediaType,
        url,
        caption: caption || null,
        altText: altText || null,
        isFeatured: isFeatured || false,
        order: order || 0
      }
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating gallery item:', error)
    return NextResponse.json(
      { error: 'Failed to update gallery item' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; galleryId: string }> }
) {
  try {
    const { id, galleryId: galleryIdParam } = await params
    const eventId = parseInt(id)
    const galleryId = parseInt(galleryIdParam)

    if (isNaN(eventId) || isNaN(galleryId)) {
      return NextResponse.json(
        { error: 'Invalid event ID or gallery ID' },
        { status: 400 }
      )
    }

    await prisma.eventGallery.delete({
      where: { 
        id: galleryId,
        eventId: eventId // Ensure the gallery item belongs to the event
      }
    })

    return NextResponse.json({ message: 'Gallery item deleted successfully' })
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return NextResponse.json(
      { error: 'Failed to delete gallery item' },
      { status: 500 }
    )
  }
}
