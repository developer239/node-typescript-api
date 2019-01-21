import Koa from 'koa'
import operations from '~/operations/session'
import validate from '~/middleware/validate'
import schemas from '~/validations/schemas/session'
import errors from '~/utils/errors'

const authenticate = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const parsedHeader = parseHeader(ctx.header.authorization)
  if (!parsedHeader || !parsedHeader.value
    || !parsedHeader.scheme || parsedHeader.scheme.toLowerCase() !== 'jwt'
  ) {
    throw errors.invalidCredentials()
  }

  const input = { jwtToken: parsedHeader.value }
  validate(schemas.jwtToken)({ request: { body: input }})

  const data = await operations.verifyTokenPayload(input)
  if (ctx.response && data.loginTimeout) {
    ctx.set('Login-timeout', `${data.loginTimeout}`)
  }
  ctx.state.user = data.user

  return next()
}

function parseHeader(hdrValue: string) {
  if (!hdrValue) {
    return null
  }
  const matches = hdrValue.match(/(\S+)\s+(\S+)/u)
  return matches && {
    scheme: matches[1],
    value: matches[2],
  }
}

export default authenticate
