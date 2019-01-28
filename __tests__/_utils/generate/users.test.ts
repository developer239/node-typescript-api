import { generateUser } from '~/database/sql/fixtures'

describe('generateUser', () => {
  test('it returns random data', async () => {
    const user = await generateUser()

    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('password')
  })

  test('it returns provided data', async () => {
    const userData = {
      email: 'my@email.com',
      password: 'somePassword',
      resetPasswordToken: 'resetToken',
      resetPasswordTokenExpires: 'expiresAt',
    }
    const user = await generateUser(userData)
    expect(user).toEqual(userData)
  })
})
