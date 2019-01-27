import moment from 'moment'
import nanoid from 'nanoid'
import mailer from '~/services/mailer'
import userRepository from '~/repositories/user'
import refreshTokenRepository from '~/repositories/refreshToken'
import errors from '~/utils/errors'
import crypto from '~/services/crypto'
import config from '~/config'
import { IRefreshToken, IUserDB } from '~/database/sql/models'
import logger from '~/services/logger'

async function login(input: Pick<IUserDB, 'email' | 'password'>) {
  const user = await userRepository.findByEmail(input.email)
  if (!user) {
    throw errors.invalidCredentials()
  }

  const isVerified = await crypto.comparePasswords(input.password, user.password)
  if (!isVerified) {
    throw errors.invalidCredentials()
  }

  const accessToken = await crypto.generateAccessToken(user.id)
  const refreshToken = await crypto.generateRefreshToken(user.id)
  await refreshTokenRepository.create({ userId: user.id, token: refreshToken })

  return {
    ...user.toJSON(),
    accessToken,
    refreshToken,
  }
}

async function passwordForgot(input: Pick<IUserDB, 'email'>) {
  const user = await userRepository.findByEmail(input.email)
  if (!user) {
    throw errors.notFoundError(`There is no user with email ${input.email}`)
  }

  const newToken = nanoid(15)
  const resetPasswordToken = newToken
  const resetPasswordTokenExpires = moment().add(20, 'm').toISOString()
  await userRepository.patchById(user.id, {
    resetPasswordToken,
    resetPasswordTokenExpires,
  })

  const redirectUrl = config.email.redirectUrl
  const emailText = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    redirectUrl + '/password-reset/?token=' + newToken + '\n\n' +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n'

  await mailer.send({
    to: user.email,
    subject: 'NODE TYPESCRIPT API PASSWORD RESET',
    text: emailText,
  })

  logger.info(`Sending email to : ${user.email}`)
  logger.info(emailText)

  return {
    user,
  }
}

async function passwordReset(input: { password: IUserDB['password'], token: IRefreshToken['token'] }) {
  const user = await userRepository.findByToken(input.token)
  if (!user) {
    throw errors.notFoundError('Password reset token is not valid.')
  }

  if (moment().isAfter(moment(user.resetPasswordTokenExpires!))) {
    throw errors.validationError('Password reset token is not valid.')
  }

  const updatedUser = await userRepository.patchById(user.id, {
    password: await crypto.hashPassword(input.password),
    resetPasswordToken: null,
    resetPasswordTokenExpires: null,
  })

  const accessToken = await crypto.generateAccessToken(updatedUser.id)
  const refreshToken = await crypto.generateRefreshToken(updatedUser.id)
  await refreshTokenRepository.create({ userId: updatedUser.id, token: refreshToken })

  return {
    ...updatedUser.toJSON(),
    accessToken,
    refreshToken,
  }
}

async function token(input: { refreshToken: IRefreshToken['token'], userId: IUserDB['id'] }) {
  const refreshToken = await refreshTokenRepository.find({ token: input.refreshToken })
  if (!refreshToken) {
    throw errors.invalidCredentials()
  }
  const newToken = await crypto.generateAccessToken(input.userId)

  return {
    token: newToken,
  }
}

async function verifyTokenPayload(input: { jwtToken: string }) {
  const jwtPayload = await crypto.verifyAccessToken(input.jwtToken)
  const now = Date.now()
  if (!jwtPayload || !jwtPayload.exp || now >= jwtPayload.exp * 1000) {
    throw errors.invalidCredentials()
  }

  const userId = parseInt(jwtPayload.userId, 10)
  const user = await userRepository.findById(userId)
  if (!user) {
    throw errors.invalidCredentials()
  }

  return {
    user: user.toJSON(),
    loginTimeout: jwtPayload.exp * 1000,
  }
}

export default {
  login,
  passwordForgot,
  passwordReset,
  token,
  verifyTokenPayload,
}
