import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const coreMemberId = parseInt(id)

    if (isNaN(coreMemberId)) {
      return NextResponse.json(
        { error: 'Invalid core member ID' },
        { status: 400 }
      )
    }

    const coreMember = await prisma.coreMember.findUnique({
      where: { id: coreMemberId }
    })

    if (!coreMember) {
      return NextResponse.json(
        { error: 'Core member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(coreMember)
  } catch (error) {
    console.error('Error fetching core member:', error)
    return NextResponse.json(
      { error: 'Failed to fetch core member' },
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
    const coreMemberId = parseInt(id)
    const body = await request.json()

    if (isNaN(coreMemberId)) {
      return NextResponse.json(
        { error: 'Invalid core member ID' },
        { status: 400 }
      )
    }

    const { firstName, lastName, role, bio, imageURL, email, phone, isActive, displayOrder } = body

    const coreMember = await prisma.coreMember.update({
      where: { id: coreMemberId },
      data: {
        firstName,
        lastName,
        role,
        bio,
        imageURL,
        email,
        phone,
        isActive,
        displayOrder
      }
    })

    return NextResponse.json(coreMember)
  } catch (error) {
    console.error('Error updating core member:', error)
    return NextResponse.json(
      { error: 'Failed to update core member' },
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
    const coreMemberId = parseInt(id)

    if (isNaN(coreMemberId)) {
      return NextResponse.json(
        { error: 'Invalid core member ID' },
        { status: 400 }
      )
    }

    await prisma.coreMember.delete({
      where: { id: coreMemberId }
    })

    return NextResponse.json({ message: 'Core member deleted successfully' })
  } catch (error) {
    console.error('Error deleting core member:', error)
    return NextResponse.json(
      { error: 'Failed to delete core member' },
      { status: 500 }
    )
  }
}
