import pino from 'pino'
import config from '~/config'

// noinspection TsLint
const app = require('../../package.json')

export default pino({
  name: app.name,
  ...config.logger,
})
