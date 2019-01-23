import jsonschema from 'jsonschema'
import logger from '~/services/logger'
import errors from '~/utils/errors'

const validate = (schema: any) => (
  ctx: any,
  next?: () => Promise<any>
) => {
  const validator = new jsonschema.Validator()
  schema.additionalProperties = false

  const validationErrors = validator.validate(ctx.request.body, schema).errors
  if (validationErrors.length > 0) {
    if (process.env.NODE_ENV !== 'test') {
      logger.warn(validationErrors)
    }
    throw errors.validationError()
  }

  if (ctx.state) {
    ctx.state.validatedBody = ctx.request.body
  }

  if (next) {
    return next()
  }
}

export default validate
