import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import config from '../utils/config'

const DATABASE_URL =
  process.env.NODE_ENV === 'production' ? config.DATABASE_URL : config.DEV_DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('Database URL is not defined')
}

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
})

export const prisma = new PrismaClient({ adapter })
export default prisma
