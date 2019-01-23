import moment from 'moment'
import app from '~test/_utils/requestPublic'
import { truncate } from '~test/_utils/database'
import { createUser } from '~test/_utils/database/users'
import mockFaker from '~/services/faker'
import crypto from '~/services/crypto'
import { expectDefault, expectInvalidData } from '~test/_utils/expectHelper'

describe('[controller] Session', () => {
  afterEach(async () => {
    await truncate(['users', 'refresh_tokens'])
  })

  describe('[post] /session/password-reset', () => {
    test('should handle invalid request data', async (done) => {
      const response = await app()
        .post('/session/password-reset')

      expectInvalidData(response)
      done()
    })

    test('should handle expired token', async (done) => {
      const longTimeAgo = moment().subtract(21, 'M').toISOString()
      await createUser({ resetPasswordTokenExpires: longTimeAgo })

      const response = await app()
        .post(
          '/session/password-reset',
          {
            password: 'newPassword',
            token: 'fakePasswordResetToken',
          },
        )

      expectDefault(
        response,
        {
          message: 'Password reset token is not valid.',
        },
        400,
      )
      done()
    })

    test('should update user password', async (done) => {
      await createUser()
      const response = await app()
        .post(
          '/session/password-reset',
          {
            password: 'newPassword',
            token: 'fakePasswordResetToken',
          },
        )

      expectDefault(
        response,
        {
          id: 1,
          email: mockFaker.internet.email(),
          accessToken: await crypto.generateAccessToken(1),
          refreshToken: await crypto.generateRefreshToken(1),
        },
        200,
      )
      done()
    })
  })
})
