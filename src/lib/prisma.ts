import { PrismaClient } from 'generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = new PrismaClient().$extends(withAccelerate())

export default prisma
