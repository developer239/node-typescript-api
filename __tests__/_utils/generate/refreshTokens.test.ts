import { generateRefreshToken } from './refreshTokens'

describe('generateRefreshToken', () => {
  test('it returns provided data', async () => {
    const refreshTokenData = {
      userId: 1,
      token: 'someToken',
    }
    const token = await generateRefreshToken(refreshTokenData)
    expect(token).toEqual(refreshTokenData)
  })
})
