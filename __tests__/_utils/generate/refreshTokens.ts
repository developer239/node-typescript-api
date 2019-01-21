import { IRefreshToken } from '~/database/sql/models'

export const generateRefreshToken = (refreshTokenData: Partial<IRefreshToken>): Partial<IRefreshToken> =>
  refreshTokenData
