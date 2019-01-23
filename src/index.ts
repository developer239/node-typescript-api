import './init'

import ip from 'ip'
import Koa from 'koa'
import compose from 'koa-compose'
import config from '~/config'
import koaMiddleware from '~/koaMiddleware'

const app = new Koa().use(compose(koaMiddleware))

/* istanbul ignore if  */
if (!module.parent) {
  app.listen(config.server.port, () => {
    const address = `${ip.address()}:${config.server.port}`
    console.info(`Server running on ${address}`) // tslint:disable-line:no-console
  })
}

export default app
