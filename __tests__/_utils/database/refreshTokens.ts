import '~/database/sql'
import { IRefreshTokenDB, RefreshToken } from '~/database/sql/models'
import { generateRefreshToken } from '~test/_utils/generate'

export const createRefreshToken = async (data: Partial<IRefreshTokenDB>) =>
  RefreshToken.query().insert(await generateRefreshToken(data))
