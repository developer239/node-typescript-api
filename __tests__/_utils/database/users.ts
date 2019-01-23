import '~/database/sql'
import userRepo from '~/repositories/user'
import { generateUser } from '~/database/sql/fixtures'
import { IUser, IUserDB } from '~/database/sql/models'

export const createUser = async (data?: Partial<IUserDB>) =>
  (await userRepo.create(await generateUser(data))).toJSON() as IUser
