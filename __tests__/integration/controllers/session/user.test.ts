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

  describe('[post] /session/user', () => {
    test('should handle invalid request data', async (done) => {
      const response = await app()
        .post('/session/user')

      expectInvalidData(response)
      done()
    })

    test('should handle missing user', async (done) => {
      const response = await app()
        .post(
          '/session/user',
          {
            email: 'missing@email.com',
            password: 'somepassword',
          })

      expectDefault(
        response,
        { message: 'Invalid credentials' },
        401,
      )
      done()
    })

    test('should handle invalid credentials', async (done) => {
      const user = await createUser()
      const response = await app()
        .post(
          '/session/user',
          {
            email: user.email,
            password: 'wrong password',
          },
        )

      expectDefault(
        response,
        { message: 'Invalid credentials' },
        401,
      )
      done()
    })

    test('should handle valid credentials', async (done) => {
      const user = await createUser()
      const response = await app()
        .post(
          '/session/user',
          {
            email: user.email,
            password: mockFaker.internet.password(),
          },
        )

      expectDefault(
        response,
        {
          id: user.id,
          email: user.email,
          accessToken: await crypto.generateAccessToken(user.id),
          refreshToken: await crypto.generateRefreshToken(user.id),
        },
        200,
      )
      done()
    })
  })
})
