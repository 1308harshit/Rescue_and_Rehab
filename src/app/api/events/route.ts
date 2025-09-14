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
