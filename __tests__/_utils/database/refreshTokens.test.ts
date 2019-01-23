import { truncate } from '~test/_utils/database'
import { createRefreshToken } from './refreshTokens'
import { createUser } from './users'
import { generateRefreshToken } from '~/database/sql/fixtures'

describe('[utils] Database RefreshTokens', () => {
  afterEach(async () => {
    await truncate(['users', 'refresh_tokens'])
  })

  describe('createRefreshToken', () => {
    test('it creates a refresh token', async () => {
      await createUser()
      const expectedData = await generateRefreshToken()
      const refreshTokenData = await createRefreshToken()
      expect(refreshTokenData).toEqual({
        id: 1,
        ...expectedData,
      })
    })
  })
})
