import path from 'path'
import staticServe from 'koa-static'

import createApplication from '../application'
import createLogger from '../logger'
import proxy from './proxy'
import startApiServer from '../api/server'
import config from '../config'

const app = createApplication()

app.logger = createLogger()
app.use(staticServe(path.join(__dirname, '..', '..')))

app.use(proxy('/api'))

app.listen(config.web.port, (err) => {
  if (err) {
    console.error(err)
  } else {
    startApiServer().then(() => {
      app.logger.info('Server is running...')
      app.logger.info('%s server listening on %s:%d...', config.api.name, config.api.host, config.api.port)
      app.logger.info('%s server listening on %s:%d...', config.web.name, config.web.host, config.web.port)
    })
  }
})
