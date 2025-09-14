import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cityId = searchParams.get('cityId')
    const type = searchParams.get('type')
    const isAvailable = searchParams.get('isAvailable')

    const where: any = {}

    if (cityId) {
      where.shelter = {
        cityId: parseInt(cityId)
      }
    }

    if (type) {
      where.type = type.toUpperCase()
    }

    if (isAvailable !== null) {
      where.isAvailable = isAvailable === 'true'
    }

    const animals = await prisma.animal.findMany({
      where,
      include: {
        shelter: {
          include: {
            city: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(animals)
  } catch (error) {
    console.error('Error fetching animals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch animals' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, type, age, story, isAvailable, imageURL, shelterId } = body

    // Validate required fields
    if (!name || !type || !story || !shelterId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new animal
    const animal = await prisma.animal.create({
      data: {
        name,
        type: type.toUpperCase(),
        age: age ? parseInt(age) : null,
        story,
        isAvailable: isAvailable !== false,
        imageURL: imageURL || [],
        shelterId: parseInt(shelterId),
      },
      include: {
        shelter: {
          include: {
            city: true,
          },
        },
      },
    })

    return NextResponse.json(animal, { status: 201 })
  } catch (error) {
    console.error('Error creating animal:', error)
    return NextResponse.json(
      { error: 'Failed to create animal' },
      { status: 500 }
    )
  }
}