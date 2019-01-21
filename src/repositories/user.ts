import { IRefreshToken, IUserDB, User } from '~/database/sql/models'

export const findById = (id: IUserDB['id']) =>
  User.query().findById(id)

export const findByEmail = (email: IUserDB['email']) =>
  User.query().where('email', email).first()

export const findByToken = (token: IRefreshToken['token']) =>
  User.query().where('resetPasswordToken', token).first()

export const patchById = (id: IUserDB['id'], data: Partial<IUserDB>) =>
  User.query().patchAndFetchById(id, data)

export const create = (attributes: Pick<IUserDB, 'email' | 'password'>) =>
  User.query().insertAndFetch(attributes)

export default {
  findById,
  findByEmail,
  findByToken,
  patchById,
  create,
}
