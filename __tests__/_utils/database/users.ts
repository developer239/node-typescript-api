import '~/database/sql'
import { IUserDB, User } from '~/database/sql/models'
import { generateUser } from '~test/_utils/generate'

export const createUser = async (data?: Partial<IUserDB>) => User.query().insert(await generateUser(data))
