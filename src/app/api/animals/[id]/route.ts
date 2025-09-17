import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const animalId = parseInt(id)

    if (isNaN(animalId)) {
      return NextResponse.json(
        { error: 'Invalid animal ID' },
        { status: 400 }
      )
    }

    // Find the animal with related data
    const animal = await prisma.animal.findUnique({
      where: { id: animalId },
      include: {
        shelter: {
          include: {
            city: true,
          },
        },
      },
    })

    if (!animal) {
      return NextResponse.json(
        { error: 'Animal not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(animal)
  } catch (error) {
    console.error('Error fetching animal:', error)
    return NextResponse.json(
      { error: 'Failed to fetch animal' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const animalId = parseInt(id)

    if (isNaN(animalId)) {
      return NextResponse.json(
        { error: 'Invalid animal ID' },
        { status: 400 }
      )
    }

    // Check if animal exists
    const animal = await prisma.animal.findUnique({
      where: { id: animalId }
    })

    if (!animal) {
      return NextResponse.json(
        { error: 'Animal not found' },
        { status: 404 }
      )
    }

    // Delete the animal
    await prisma.animal.delete({
      where: { id: animalId }
    })

    return NextResponse.json(
      { message: 'Animal deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting animal:', error)
    return NextResponse.json(
      { error: 'Failed to delete animal' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const animalId = parseInt(id)
    const body = await request.json()

    if (isNaN(animalId)) {
      return NextResponse.json(
        { error: 'Invalid animal ID' },
        { status: 400 }
      )
    }

    // Check if animal exists
    const animal = await prisma.animal.findUnique({
      where: { id: animalId }
    })

    if (!animal) {
      return NextResponse.json(
        { error: 'Animal not found' },
        { status: 404 }
      )
    }

    // Update the animal
    const updatedAnimal = await prisma.animal.update({
      where: { id: animalId },
      data: {
        name: body.name,
        type: body.type,
        age: body.age,
        story: body.story,
        isAvailable: body.isAvailable,
        imageURL: body.imageURL,
      },
      include: {
        shelter: {
          include: {
            city: true,
          },
        },
      },
    })

    return NextResponse.json(updatedAnimal)
  } catch (error) {
    console.error('Error updating animal:', error)
    return NextResponse.json(
      { error: 'Failed to update animal' },
      { status: 500 }
    )
  }
}
