import 'dotenv/config'

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3001,
  database: {
    url: process.env.DATABASE_URL || '',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
} as const