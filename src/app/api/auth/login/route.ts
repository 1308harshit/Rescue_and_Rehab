import { NextRequest, NextResponse } from 'next/server'
import { generateToken } from '@/lib/auth'

// Simple hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  email: 'admin@rescueandrehab.org',
  password: 'admin123'
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Simple credential check
    const isValidCredentials = 
      (username === ADMIN_CREDENTIALS.username || username === ADMIN_CREDENTIALS.email) &&
      password === ADMIN_CREDENTIALS.password

    if (!isValidCredentials) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate token
    const token = generateToken({
      id: 1,
      username: ADMIN_CREDENTIALS.username,
      email: ADMIN_CREDENTIALS.email,
      isActive: true
    })

    // Create response with token in cookie
    const response = NextResponse.json({
      message: 'Login successful',
      admin: {
        id: 1,
        username: ADMIN_CREDENTIALS.username,
        email: ADMIN_CREDENTIALS.email
      }
    })

    // Set HTTP-only cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/' // Ensure cookie is available for all paths
    })
    
    console.log('Cookie set:', token.substring(0, 20) + '...')

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
