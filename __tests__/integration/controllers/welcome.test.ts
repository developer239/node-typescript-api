import app from '~test/_utils/requestPublic'
import crypto from '~/utils/crypto'
import { createUser } from '~test/_utils/database/users'
import { IUser } from '~/database/sql/models'
import { truncate } from '~test/_utils/database'

describe('[controller] Welcome', () => {
  afterEach(async () => {
    await truncate(['users', 'refresh_tokens'])
  })

  test('/ should respond with status 200 and greetings', (done) => {
    return app()
      .get('/')
      .expect(200, 'Node Typescript API 🌍')
      .end(done)
  })

  describe('/secured', () => {
    test('should respond with status 401 if no credentials', (done) => {
      return app()
        .get('/secured')
        .expect(401, { message: 'Invalid credentials' })
        .end(done)
    })

    test('should respond with status 401 if wrong credentials', (done) => {
      return app()
        .get('/secured')
        .set('Authorization', 'JWT fakeAccessToken')
        .expect(401, { message: 'Invalid credentials' })
        .end(done)
    })

    test('should respond with status 200 if correct credentials', async (done) => {
      const user = await createUser()
      const userJson = user.toJSON() as IUser
      const accessToken = await crypto.generateAccessToken(userJson.id)
      const response = await app()
        .get('/secured')
        .set('Authorization', `jwt ${accessToken}`)

      expect(response.body).toEqual({ message: 'Node Typescript API 🌍 [secured resource]' })
      expect(response.status).toEqual(200)
      done()
    })
  })
})
