import Router from 'koa-router'
import { welcome, welcomeSecured } from '~/controllers/welcome'
import { login, passwordForgot, passwordReset, token } from '~/controllers/session'
import { signUp } from '~/controllers/users'

export const router = new Router()

router.get('/', welcome)
router.get('/secured', welcomeSecured)

router.post('/session/user', login)
router.post('/session/password-forgot', passwordForgot)
router.post('/session/password-reset', passwordReset)
router.post('/session/token', token)

router.post('/users', signUp)

export default router
