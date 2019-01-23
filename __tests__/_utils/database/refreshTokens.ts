import '~/database/sql'
import { generateRefreshToken } from '~/database/sql/fixtures'
import refreshTokenRepo from '~/repositories/refreshToken'
import { IRefreshToken } from '~/database/sql/models'

export const createRefreshToken = async (data?: Partial<IRefreshToken>) =>
  (await refreshTokenRepo.create(await generateRefreshToken(data))).toJSON() as IRefreshToken
