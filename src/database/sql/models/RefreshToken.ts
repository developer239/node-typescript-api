import R from 'ramda'
import { Model } from 'objection'

export interface IRefreshToken {
  id: number
  userId: number
  token: string
}

export interface IRefreshTokenDB extends IRefreshToken {
  createdAt: string
  updatedAt: string
}

export class RefreshToken extends Model {
  static get tableName() {
    return 'refresh_tokens'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'userId',
        'token',
      ],

      properties: {
        userId: {
          type: 'uuid',
        },
        token: {
          type: 'string',
        },
      },
    }
  }

  static get relationMappings() {
    const User = require(__dirname + '/User').User

    return {
      user: {
        join: {
          from: 'refresh_tokens.userId',
          to: 'users.id',
        },
        modelClass: User,
        relation: Model.HasOneRelation,
      },
    }
  }

  public id: number
  public userId: number
  public token: string
  public createdAt: string
  public updatedAt: string

  public $formatJson(json: IRefreshTokenDB): IRefreshToken {
    return R.pick([
      'id',
      'userId',
      'token',
    ], json)
  }
}
