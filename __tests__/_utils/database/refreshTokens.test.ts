import { truncate } from '~test/_utils/database'
import { createRefreshToken } from './refreshTokens'
import { createUser } from './users'

describe('[utils] Database RefreshTokens', () => {
  afterEach(async () => {
    await truncate(['users', 'refresh_tokens'])
  })

  describe('createRefreshToken', () => {
    test('it creates a refresh token', async () => {
      await createUser()
      const refreshTokenData = { userId: 1, token: 'someFakeToken' }
      const refreshToken = await createRefreshToken(refreshTokenData)
      const refreshTokenJson = refreshToken.toJSON()
      expect(refreshTokenJson).toEqual({
        id: 1,
        ...refreshTokenData,
      })
    })
  })
})
