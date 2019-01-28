import moment from 'moment'
import { merge } from 'ramda'
import faker, { fakerExtension } from '~/services/faker'
import crypto from '~/services/crypto'
import { IUserDB } from '~/database/sql/models'
import { Omit } from '~/types'

export const generateUser = async (data?: Partial<IUserDB>): Promise<Omit<IUserDB, 'id' | 'createdAt' | 'updatedAt'>> =>
  merge({
    email: faker.internet.email(),
    password: await crypto.hashPassword(faker.internet.password()),
    resetPasswordToken: fakerExtension.resetPasswordToken(),
    resetPasswordTokenExpires: moment().add(20, 'm').toISOString(),
  }, data)
