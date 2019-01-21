import moment from 'moment'
import app from '~test/_utils/requestPublic'
import { truncate } from '~test/_utils/database'
import { IUser } from '~/database/sql/models/User'
import { createUser } from '~test/_utils/database/users'
import { createRefreshToken } from '~test/_utils/database/refreshTokens'
import mockFaker from '~mock/faker'
import crypto from '~/utils/crypto'
import { handleInvalidRequestData } from './session.helper'

describe('[controller] Session', () => {
  afterEach(async () => {
    await truncate(['users', 'refresh_tokens'])
  })

  describe('[post] /session/user', () => {
    test('should handle invalid request data', handleInvalidRequestData('/session/user'))

    test('should handle missing user', (done) => {
      return app()
        .post('/session/user')
        .send({
          email: 'missing@email.com',
          password: 'somepassword',
        })
        .expect(401, { message: 'Invalid credentials' })
        .end(done)
    })

    test('should handle invalid credentials', async (done) => {
      const user = await createUser()
      const userJson = user.toJSON() as IUser

      const response = await app()
        .post('/session/user')
        .send({
          email: userJson.email,
          password: 'wrong password',
        })

      expect(response.body).toEqual({ message: 'Invalid credentials' })
      expect(response.status).toEqual(401)
      done()
    })

    test('should handle valid credentials', async (done) => {
      const user = await createUser()
      const userJson = user.toJSON() as IUser

      const response = await app()
        .post('/session/user')
        .send({
          email: userJson.email,
          password: mockFaker.internet.password(),
        })

      expect(response.body).toEqual({
        id: userJson.id,
        email: userJson.email,
        accessToken: await crypto.generateAccessToken(userJson.id),
        refreshToken: await crypto.generateRefreshToken(userJson.id),
      })
      expect(response.status).toEqual(200)
      done()
    })
  })

  describe('[post] /session/password-forgot', () => {
    test('should handle invalid request data', handleInvalidRequestData('/session/password-forgot'))

    test('should throw user does not exist', (done) => {
      return app()
        .post('/session/password-forgot')
        .send({
          email: 'fake@email.com',
        })
        .expect(404, { message: 'There is no user with email fake@email.com' })
        .end(done)
    })

    // TODO:
    // test('should generate user access token')
  })

  describe('[post] /session/password-reset', () => {
    test('should handle invalid request data', handleInvalidRequestData('/session/password-reset'))

    test('should handle expired token', async (done) => {
      const longTimeAgo = moment().subtract(21, 'M').toISOString()
      await createUser({ resetPasswordTokenExpires: longTimeAgo })

      const response = await app()
        .post('/session/password-reset')
        .send({
          password: 'newPassword',
          token: 'fakePasswordResetToken',
        })

      expect(response.body).toEqual({
        message: 'Password reset token is not valid.',
      })
      expect(response.status).toEqual(400)
      done()
    })

    test('should update user password', async (done) => {
      await createUser()
      const response = await app()
        .post('/session/password-reset')
        .send({
          password: 'newPassword',
          token: 'fakePasswordResetToken',
        })

      expect(response.body).toEqual({
        id: 1,
        email: mockFaker.internet.email(),
        accessToken: await crypto.generateAccessToken(1),
        refreshToken: await crypto.generateRefreshToken(1),
      })

      done()
    })
  })

  describe('[post] /session/token', () => {
    test('should handle invalid request data', handleInvalidRequestData('/session/token'))

    test('should throw if token does not exist', (done) => {
      return app()
        .post('/session/token')
        .send({
          refreshToken: 'nonExistingToken',
          userId: 1,
        })
        .expect(401, { message: 'Invalid credentials' })
        .end(done)
    })

    test('should update user password', async (done) => {
      await createUser()
      const fakeRefreshToken = 'someFakeToken'
      const userId = 1
      await createRefreshToken({
        userId,
        token: fakeRefreshToken,
      })

      const response = await app()
        .post('/session/token')
        .send({
          userId,
          refreshToken: fakeRefreshToken,
        })

      const newAccessToken = await crypto.generateAccessToken(userId)
      expect(response.body).toEqual({
        token: newAccessToken,
      })

      done()
    })
  })
})
