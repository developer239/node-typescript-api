import app from '~test/_utils/requestPublic'
import { truncate } from '~test/_utils/database'

describe('[controller] Welcome', () => {
  afterEach(async () => {
    await truncate(['users', 'refresh_tokens'])
  })

  test('/ should respond with status 200 and greetings', async (done) => {
    const response = await app()
      .get('/')

    expect(response.text).toEqual('Node Typescript API 🌍')
    expect(response.status).toEqual(200)
    done()
  })
})
