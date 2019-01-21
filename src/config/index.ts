import { config as configDotenv } from 'dotenv'
import { resolve } from 'path'

/* istanbul ignore next */
const nodeEnv = process.env.NODE_ENV || 'development'

configDotenv({
  path: resolve(process.cwd(), `.env.${nodeEnv}`),
})

const config = {
  database: {
    sql: {
      host: process.env.DATABASE_HOST!,
      name: process.env.POSTGRES_DB!,
      password: process.env.POSTGRES_PASSWORD!,
      user: process.env.POSTGRES_USER!,
    },
  },
  server: {
    port: parseInt(process.env.PORT!, 10) || 8080,
    url: process.env.SERVER_URL || 'localhost',
  },
  logger: {
    enabled: true,
    level: 'debug',
  },
  auth: {
    secret: process.env.AUTH_SECRET || 'developmentAuthSecret',
    secretRefresh: process.env.AUTH_SECRET || 'developmentAuthRefreshSecret',
    saltRounds: 10,
    createOptions: {
      expiresIn: 60 * 60,
      algorithm: 'HS256',
      issuer: `jwt-issuer`,
    },
    verifyOptions: {
      algorithm: 'HS256',
      issuer: `jwt-issuer`,
    },
  },
  email: {
    from: process.env.EMAIL_FROM_ADDRESS,
    redirectUrl: process.env.EMAIL_REDIRECT_URL,
    token: process.env.EMAIL_TOKEN!,
  },
}

export default config
