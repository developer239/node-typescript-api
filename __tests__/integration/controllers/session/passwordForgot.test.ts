import app from '~test/_utils/requestPublic'
import { truncate } from '~test/_utils/database'
import { expectDefault, expectInvalidData } from '~test/_utils/expectHelper'

describe('[controller] Session', () => {
  afterEach(async () => {
    await truncate(['users', 'refresh_tokens'])
  })

  describe('[post] /session/password-forgot', () => {
    test('should handle invalid request data', async (done) => {
      const response = await app()
        .post('/session/password-forgot')

      expectInvalidData(response)
      done()
    })

    test('should throw user does not exist', async (done) => {
      const response = await app()
        .post(
          '/session/password-forgot',
          {
            email: 'fake@email.com',
          },
        )

      expectDefault(
        response,
        { message: 'There is no user with email fake@email.com' },
        404,
      )
      done()
    })

    // TODO:
    // test('should generate user access token')
  })
})
