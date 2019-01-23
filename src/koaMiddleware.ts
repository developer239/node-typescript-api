import koaCors from 'kcors'
import koaBody from 'koa-bodyparser'
import compose from 'koa-compose'
import mount from 'koa-mount'
import serve from 'koa-static'
import { handleErrors } from '~/middleware/errors'
import { router } from '~/router'

const docsMiddleware = compose([
  mount('/docs', serve('node_modules/redoc/bundles/')),
  mount('/docs', serve('docs/')),
])

const koaMiddleware = [
  koaCors({
    origin: '*',
    exposeHeaders: [
      'Authorization',
      'Content-Language',
      'Content-Length',
      'Content-Type',
      'Date',
      'ETag',
    ],
    maxAge: 3600,
  }),
  koaBody(),
  handleErrors,
  router.routes(),
  docsMiddleware,
  router.allowedMethods(),
]

export default koaMiddleware
