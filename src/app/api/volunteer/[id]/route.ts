import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const volunteerId = parseInt(id)

    if (isNaN(volunteerId)) {
      return NextResponse.json(
        { error: 'Invalid volunteer ID' },
        { status: 400 }
      )
    }

    await prisma.volunteerApplication.delete({
      where: { id: volunteerId }
    })

    return NextResponse.json({ message: 'Volunteer removed successfully' })
  } catch (error) {
    console.error('Error removing volunteer:', error)
    return NextResponse.json(
      { error: 'Failed to remove volunteer' },
      { status: 500 }
    )
  }
}
