import Koa from 'koa'
import compose from 'koa-compose'
import validate from '~/middleware/validate'
import schema from '~/validations/schemas/users'
import operations from '~/operations/users'

export const signUp = compose([
  validate(schema.signUp),
  async (ctx: Koa.Context) => {
    const body = ctx.state.validatedBody
    ctx.body = await operations.signUp(body)
  },
])
