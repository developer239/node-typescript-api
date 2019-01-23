import { merge } from 'ramda'
import { IRefreshToken } from '~/database/sql/models'
import crypto from '~/services/crypto'
import { Omit } from '~/types'

export const generateRefreshToken = async (data?: Partial<IRefreshToken>): Promise<Omit<IRefreshToken, 'id'>> =>
  merge({
    userId: 1,
    token: await crypto.generateRefreshToken((data && data.userId) || 1),
  }, data)
