import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    const type: string | null = data.get('type') as string // 'animal', 'event', 'logo'
    const category: string | null = data.get('category') as string // 'dogs', 'cows', 'birds'

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!type) {
      return NextResponse.json({ error: 'No type specified' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const fileName = `${timestamp}-${randomString}.${fileExtension}`

    // Determine upload path based on type
    let uploadPath: string
    if (type === 'animal' && category) {
      uploadPath = join(process.cwd(), 'public', 'images', 'animals', category)
    } else if (type === 'event') {
      uploadPath = join(process.cwd(), 'public', 'images', 'events')
    } else if (type === 'logo') {
      uploadPath = join(process.cwd(), 'public', 'images', 'logo')
    } else {
      return NextResponse.json({ error: 'Invalid type or category' }, { status: 400 })
    }

    // Create directory if it doesn't exist
    if (!existsSync(uploadPath)) {
      await mkdir(uploadPath, { recursive: true })
    }

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = join(uploadPath, fileName)
    await writeFile(filePath, buffer)

    // Return the public URL
    const publicUrl = `/images/${type === 'animal' ? `animals/${category}` : type}s/${fileName}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: fileName
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
