import moment from 'moment'
import { merge } from 'ramda'
import faker from '~mock/faker'
import crypto from '~/utils/crypto'
import { IUserDB } from '~/database/sql/models'

export const generateUser = async (data?: Partial<IUserDB>): Promise<Partial<IUserDB>> => merge({
  email: faker.internet.email(),
  password: await crypto.hashPassword(faker.internet.password()),
  resetPasswordToken: 'fakePasswordResetToken',
  resetPasswordTokenExpires: moment().add(20, 'm').toISOString(),
}, data)
