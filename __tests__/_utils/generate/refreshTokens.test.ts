import { generateRefreshToken } from '~/database/sql/fixtures'

describe('generateRefreshToken', () => {
  test('it returns provided data', async () => {
    const refreshTokenData = {
      id: 1,
      userId: 1,
      token: 'token'
    }
    const token = await generateRefreshToken(refreshTokenData)
    expect(token).toEqual(refreshTokenData)
  })
})
