import Koa from 'koa'
import compose from "koa-compose";
import authenticate from "~/middleware/authentication";

export const welcome = (ctx: Koa.Context) => {
  ctx.body = 'Node Typescript API 🌍'
}

export const welcomeSecured = compose([
  authenticate,
  async (ctx: Koa.Context) => {
    ctx.body = { message: 'Node Typescript API 🌍 [secured resource]' }
  },
])
