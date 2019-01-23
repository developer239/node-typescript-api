import compose from 'koa-compose'
import validate from '~/middleware/validate'
import schema from '~/validations/schemas/users'
import operations from '~/operations/users'
import { defaultControllerHandler } from '~/utils/controller'

export const signUp = compose([
  validate(schema.signUp),
  defaultControllerHandler(operations.signUp),
])
