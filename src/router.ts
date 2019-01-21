import compose from 'koa-compose'
import Router from 'koa-router'
import { handleErrors } from '~/middleware/errors'
import { welcome, welcomeSecured } from '~/controllers/welcome'
import { login, passwordForgot, passwordReset, token } from '~/controllers/session'
import { signUp } from '~/controllers/users'

export const router = new Router()

// TODO: Move to compose middleware line 38
router.use(handleErrors)

router.post('/session/user', login)
router.post('/session/password-forgot', passwordForgot)
router.post('/session/password-reset', passwordReset)
router.post('/session/token', token)

router.post('/users', signUp)

router.get('/', welcome)
router.get('/secured', welcomeSecured)

export default compose([router.routes(), router.allowedMethods()])
