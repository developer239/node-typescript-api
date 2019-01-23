import Koa from 'koa'

export const defaultControllerHandler = (operation: any) =>
  async (ctx: Koa.Context) => {
    const body = ctx.state.validatedBody
    ctx.body = await operation(body)
  }
