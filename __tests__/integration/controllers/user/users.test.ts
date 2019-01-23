import app from '~test/_utils/requestPublic'
import { truncate } from '~test/_utils/database'
import { createUser } from '~test/_utils/database/users'
import crypto from '~/services/crypto'
import { expectDefault, expectInvalidData } from '~test/_utils/expectHelper'

describe('[controller] Users', () => {
  afterEach(async () => {
    await truncate(['users', 'refresh_tokens'])
  })

  describe('[post] /users', () => {
    test('should handle invalid request data', async (done) => {
      const response = await app()
        .post('/users')

      expectInvalidData(response)
      done()
    })

    test('should throw if emails is taken', async (done) => {
      const existingUser = await createUser()

      const response = await app()
        .post(
          '/users',
          {
            email: existingUser.email,
            password: 'somefakepassword',
          },
        )

      expectDefault(
        response,
        { message: `Email ${existingUser.email} is taken.` },
        409,
      )
      done()
    })

    test('should create new user', async (done) => {
      const response = await app()
        .post(
          '/users',
          {
            email: 'new@email.com',
            password: 'somenewemailpassword',
          },
        )

      expectDefault(
        response,
        {
          id: 1,
          accessToken: await crypto.generateAccessToken(1),
          refreshToken: await crypto.generateRefreshToken(1),
          email: 'new@email.com',
        },
        200,
      )
      done()
    })
  })
})
