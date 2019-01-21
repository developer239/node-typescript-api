import Koa from 'koa'
import errors from '~/utils/errors'

export async function handleErrors(ctx: Koa.Context, next: () => Promise<any>) {
  try {
    return await next()
  } catch (responseError) {
    if (!responseError.isBoom) {
      responseError = errors.internalServerError(responseError)
    }

    ctx.status = responseError.data.code
    ctx.body = {
      type: responseError.type,
      message: responseError.message,
    }
    return true
  }
}
