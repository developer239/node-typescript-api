import app from '~test/_utils/requestPublic'
import { truncate } from '~test/_utils/database'
import { createUser } from '~test/_utils/database/users'
import { createRefreshToken } from '~test/_utils/database/refreshTokens'
import crypto from '~/services/crypto'
import { expectDefault, expectInvalidData } from '~test/_utils/expectHelper'
import { generateRefreshToken } from '~/database/sql/fixtures'

describe('[controller] Session', () => {
  afterEach(async () => {
    await truncate(['users', 'refresh_tokens'])
  })

  describe('[post] /session/token', () => {
    test('should handle invalid request data', async (done) => {
      const response = await app()
        .post('/session/token')

      expectInvalidData(response)
      done()
    })

    test('should throw if token does not exist', async (done) => {
      const response = await app()
        .post(
          '/session/token',
          {
            refreshToken: 'nonExistingToken',
            userId: 1,
          },
        )

      expectDefault(
        response,
        { message: 'Invalid credentials' },
        401,
      )
      done()
    })

    test('should update user password', async (done) => {
      await createUser()
      const expectedData = await generateRefreshToken()
      await createRefreshToken()

      const response = await app()
        .post(
          '/session/token',
          {
            userId: expectedData.userId,
            refreshToken: expectedData.token,
          },
        )

      const newAccessToken = await crypto.generateAccessToken(expectedData.userId)
      expectDefault(
        response,
        {
          token: newAccessToken,
        },
        200,
      )
      done()
    })
  })
})
