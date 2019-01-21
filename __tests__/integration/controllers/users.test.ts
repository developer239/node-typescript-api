import R from 'ramda'
import app from '~test/_utils/requestPublic'
import { truncate } from '~test/_utils/database'
import { createUser } from '~test/_utils/database/users'
import mockFaker from '~mock/faker'
import crypto from '~/utils/crypto'

describe('[controller] Users', () => {
  afterEach(async () => {
    await truncate(['users', 'refresh_tokens'])
  })

  describe('[post] /users', () => {
    test('should handle invalid request data', (done) => {
      return app()
        .post('/users')
        .expect(400, { message: 'Invalid or missing request data.' })
        .end(done)
    })

    test('should throw if emails is taken', async (done) => {
      await createUser()
      const fakeEmail = mockFaker.internet.email()
      const response = await app()
        .post('/users')
        .send({
          email: fakeEmail,
          password: 'somefakepassword',
        })
        .expect(409)

      expect(response.body).toEqual({ message: `Email ${fakeEmail} is taken.` })
      expect(response.status).toEqual(409)
      done()
    })

    test('should create new user', async (done) => {
      const user = {
        email: 'new@email.com',
        password: 'somenewemailpassword',
      }

      const response = await app()
        .post('/users')
        .send(user)

      expect(response.body).toEqual({
        id: 1,
        accessToken: await crypto.generateAccessToken(1),
        refreshToken: await crypto.generateRefreshToken(1),
        ...R.omit(['password'], user),
      })
      expect(response.status).toEqual(200)
      done()
    })
  })
})
