import app from '~test/_utils/requestPublic'
import authorizedApp from '~test/_utils/requestPrivate'
import { truncate } from '~test/_utils/database'
import { createUser } from '~test/_utils/database/users'
import { expectDefault } from '~test/_utils/expectHelper'

describe('[controller] Welcome', () => {
  afterEach(async () => {
    await truncate(['users', 'refresh_tokens'])
  })

  describe('/secured', () => {
    test('should respond with status 401 if no credentials', async (done) => {
      const response = await app()
        .get('/secured')

      expectDefault(
        response,
        { message: 'Invalid credentials' },
        401
      )
      done()
    })

    test('should respond with status 401 if wrong credentials', async (done) => {
      const response = await app()
        .get('/secured')

      expectDefault(
        response,
        { message: 'Invalid credentials' },
        401
      )
      done()
    })

    test('should respond with status 200 if correct credentials', async (done) => {
      await createUser()
      const response = await authorizedApp()
        .get('/secured')

      expectDefault(
        response,
        { message: 'Node Typescript API 🌍 [secured resource]' },
        200
      )
      done()
    })
  })
})
