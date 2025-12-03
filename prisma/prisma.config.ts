import { defineConfig } from '@prisma/config'
import config from '../src/utils/config'

const NODE_ENV = config.NODE_ENV

const dbUrl = NODE_ENV === 'production' ? config.DATABASE_URL : config.DEV_DATABASE_URL

if (!dbUrl) {
  throw new Error(
    NODE_ENV === 'production'
      ? '⚠️ DATABASE_URL is not defined in environment variables'
      : '⚠️ DEV_DATABASE_URL is not defined in environment variables'
  )
}

export default defineConfig({
  datasource: {
    url: dbUrl,
  },
})
