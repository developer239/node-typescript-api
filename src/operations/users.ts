import userRepository from '~/repositories/user'
import refreshTokenRepository from '~/repositories/refreshToken'
import errors from '~/utils/errors'
import crypto from '~/services/crypto'
import { IUserDB } from '~/database/sql/models'

async function signUp(input: Pick<IUserDB, 'email' | 'password'>) {
  const user = {
    email: input.email,
    password: await crypto.hashPassword(input.password),
  }

  const doesUserExist = await userRepository.findByEmail(user.email)
  if (doesUserExist) {
    throw errors.conflictError(`Email ${input.email} is taken.`)
  }

  const createdUser = await userRepository.create(user)

  const accessToken = await crypto.generateAccessToken(createdUser.id)
  const refreshToken = await crypto.generateRefreshToken(createdUser.id)
  await refreshTokenRepository.create({ userId: createdUser.id, token: refreshToken })

  return {
    ...createdUser.toJSON(),
    accessToken,
    refreshToken,
  }
}

export default {
  signUp,
}
