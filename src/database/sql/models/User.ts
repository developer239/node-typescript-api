import R from 'ramda'
import { Model } from 'objection'

export interface IUser {
  id: number
  email: string
}

export interface IUserDB extends IUser {
  password: string
  resetPasswordToken: string | null
  resetPasswordTokenExpires: string | null
  createdAt: string
  updatedAt: string
}

export class User extends Model {
  static get tableName() {
    return 'users'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'email',
        'password',
      ],

      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        resetPasswordToken: {
          anyOf: [
            {
              type: 'string',
            },
            {
              type: 'null',
            },
          ],
        },
        resetPasswordTokenExpires: {
          anyOf: [
            {
              type: 'string',
            },
            {
              type: 'null',
            },
          ],
        },
      },
    }
  }

  public id: number
  public email: string
  public password: string
  public resetPasswordToken: string | null
  public resetPasswordTokenExpires: string | null
  public createdAt: string
  public updatedAt: string

  public $formatJson(json: IUserDB): IUser {
    return R.pick([
      'id',
      'email',
    ], json)
  }
}
