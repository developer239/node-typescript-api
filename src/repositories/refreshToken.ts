import { IRefreshToken, RefreshToken } from '~/database/sql/models'
import { Omit } from '~/types'

export const find = (data: Partial<IRefreshToken>) =>
  RefreshToken.query().where(data).first()

export const create = (attributes: Omit<IRefreshToken, 'id'>) =>
  RefreshToken.query().insert(attributes)

export default {
  find,
  create,
}
