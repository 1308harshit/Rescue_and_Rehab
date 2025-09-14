import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: "prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19Zd19MZ19RcEpUQlJ5WlRGaHE1aTgiLCJhcGlfa2V5IjoiMDFLNTNHSEJEWldaSDEwQkQxNFRURFZDS0oiLCJ0ZW5hbnRfaWQiOiJjNzBlZjk0ZjJiMDk5YWVhMzM4Y2MwZjRmOGFkNjBmODc3Y2QxYTlmNzRhMGM0OGE5MzkyNTg3ZTMyZDQxODk1IiwiaW50ZXJuYWxfc2VjcmV0IjoiMmRlODY0Y2YtYTU0Zi00ZGE2LTk1NGEtNzJkODMyYzUxNDk4In0._gh0S26U4huMXas3utf3dXuPy_-SUgLu9cfmxu1Z8bc"
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
