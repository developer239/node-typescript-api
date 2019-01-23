import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt, { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken'
import util from 'util'
import config from '~/config'

interface IJwtPayload {
  exp: number
  userId: string
}

const jwtSign = util.promisify(jwt.sign) as (
  payload: string | Buffer | object,
  secretOrPrivateKey: Secret,
  options: SignOptions
) => Promise<string>

const jwtVerify = util.promisify(jwt.verify) as (
  token: string,
  secretOrPublicKey: string | Buffer,
  options?: VerifyOptions,
) => Promise<IJwtPayload>

export default {
  generateAccessToken(userId: number) {
    const payload = { userId }
    return jwtSign(payload, config.auth.secret, config.auth.createOptions)
  },

  generateRefreshToken(userId: number) {
    const payload = { userId }
    return jwtSign(payload, config.auth.secretRefresh, config.auth.createOptions)
  },

  async verifyAccessToken(accessToken: string) {
    try {
      // Don't return directly for catch block to work properly
      const data = await jwtVerify(accessToken, config.auth.secret, config.auth.verifyOptions)
      return data
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError || err instanceof SyntaxError) {
        return null
      }
      throw err
    }
  },

  hashPassword(password: string) {
    return bcrypt.hash(peperify(password), config.auth.saltRounds)
  },

  comparePasswords(plaintext: string, ciphertext: string) {
    return bcrypt.compare(peperify(plaintext), ciphertext)
  },
}

export function peperify(password: string) {
  return crypto.createHmac('sha1', config.auth.secret)
    .update(password)
    .digest('hex')
}
