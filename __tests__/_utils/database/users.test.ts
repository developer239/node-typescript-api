import { truncate } from '~test/_utils/database'
import { createUser } from './users'

describe('[utils] Database Users', () => {
  afterEach(async () => {
    await truncate(['users'])
  })

  describe('createUser', () => {
    test('it creates user in database', async () => {
      const user = await createUser()
      expect(user.id).toEqual(1)
      expect(user).toHaveProperty('email')
    })
  })
})
