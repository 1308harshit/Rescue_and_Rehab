import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cityId = searchParams.get('cityId')
    const upcoming = searchParams.get('upcoming')

    const where: any = {}

    if (cityId) {
      where.cityId = parseInt(cityId)
    }

    if (upcoming === 'true') {
      where.date = {
        gte: new Date()
      }
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        city: true,
      },
      orderBy: {
        date: 'asc',
      },
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, date, location, eventType, cityId, imageURL } = body

    // Validate required fields
    if (!name || !description || !date || !location || !eventType || !cityId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const event = await prisma.event.create({
      data: {
        name,
        description,
        date: new Date(date),
        location,
        eventType,
        cityId: parseInt(cityId),
        imageURL: imageURL || null,
      },
      include: {
        city: {
          select: {
            name: true,
            state: true
          }
        }
      }
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}