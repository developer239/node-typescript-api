import Koa from 'koa'
import compose from 'koa-compose'
import validate from '~/middleware/validate'
import schema from '~/validations/schemas/session'
import operations from '~/operations/session'

export const login = compose([
  validate(schema.login),
  async (ctx: Koa.Context) => {
    const body = ctx.state.validatedBody
    ctx.body = await operations.login(body)
  },
])

export const passwordForgot = compose([
  validate(schema.passwordForgot),
  async (ctx: Koa.Context) => {
    const body = ctx.state.validatedBody
    ctx.body = await operations.passwordForgot(body)
  },
])

export const passwordReset = compose([
  validate(schema.passwordReset),
  async (ctx: Koa.Context) => {
    const body = ctx.state.validatedBody
    ctx.body = await operations.passwordReset(body)
  },
])

export const token = compose([
  validate(schema.token),
  async (ctx: Koa.Context) => {
    const body = ctx.state.validatedBody
    ctx.body = await operations.token(body)
  },
])
