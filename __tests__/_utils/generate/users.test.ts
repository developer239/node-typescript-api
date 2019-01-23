import crypto from '~/services/crypto'
import { generateUser } from '~/database/sql/fixtures'
import faker from '~/services/faker'

describe('generateUser', () => {
  test('it returns random data', async () => {
    const user = await generateUser()
    const doesPasswordMatch = await crypto.comparePasswords(
      faker.internet.password(),
      user.password!,
    )
    expect(doesPasswordMatch).toEqual(true)
    expect(user).toMatchObject({ email: faker.internet.email() })
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
