import compose from 'koa-compose'
import validate from '~/middleware/validate'
import schema from '~/validations/schemas/session'
import operations from '~/operations/session'
import { defaultControllerHandler } from '~/utils/controller'

export const login = compose([
  validate(schema.login),
  defaultControllerHandler(operations.login),
])

export const passwordForgot = compose([
  validate(schema.passwordForgot),
  defaultControllerHandler(operations.passwordForgot),
])

export const passwordReset = compose([
  validate(schema.passwordReset),
  defaultControllerHandler(operations.passwordReset),
])

export const token = compose([
  validate(schema.token),
  defaultControllerHandler(operations.token),
])
