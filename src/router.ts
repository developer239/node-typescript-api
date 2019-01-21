import compose from 'koa-compose'
import Router from 'koa-router'
import mount from 'koa-mount'
import serve from 'koa-static'
import { handleErrors } from '~/middleware/errors'
import { welcome, welcomeSecured } from '~/controllers/welcome'
import { login, passwordForgot, passwordReset, token } from '~/controllers/session'
import { signUp } from '~/controllers/users'

export const router = new Router()

router.post('/session/user', login)
router.post('/session/password-forgot', passwordForgot)
router.post('/session/password-reset', passwordReset)
router.post('/session/token', token)

router.post('/users', signUp)

router.get('/', welcome)
router.get('/secured', welcomeSecured)

const docsMiddleware = compose([
  mount('/docs', serve('node_modules/redoc/bundles/')),
  mount('/docs', serve('docs/')),
])


export default compose([handleErrors, router.routes(), docsMiddleware, router.allowedMethods()])
