import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const coreMembers = await prisma.coreMember.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' }
    })

    return NextResponse.json(coreMembers)
  } catch (error) {
    console.error('Error fetching core members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch core members' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, role, bio, imageURL, email, phone, displayOrder } = body

    // Validate required fields
    if (!firstName || !lastName || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const coreMember = await prisma.coreMember.create({
      data: {
        firstName,
        lastName,
        role,
        bio: bio || null,
        imageURL: imageURL || null,
        email: email || null,
        phone: phone || null,
        displayOrder: displayOrder || 0,
      }
    })

    return NextResponse.json(coreMember, { status: 201 })
  } catch (error) {
    console.error('Error creating core member:', error)
    return NextResponse.json(
      { error: 'Failed to create core member' },
      { status: 500 }
    )
  }
}
