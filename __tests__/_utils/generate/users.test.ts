import crypto from '~/utils/crypto'
import { generateUser } from './users'

describe('generateUser', () => {
  test('it returns random data', async () => {
    const user = await generateUser()
    const doesPasswordMatch = await crypto.comparePasswords(
      'fakepassword',
      user.password!
    )

    expect(user).toMatchObject({
      email: 'fake@email.com',
    })
    expect(doesPasswordMatch)
      .toEqual(true)
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
