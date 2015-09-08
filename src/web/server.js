import fs from 'fs'
import path from 'path'
import koa from 'koa'
import staticServe from 'koa-static'

import config from '../config'
import createLogger from '../logger'
import createApplication from '../application'

import api from '../api/server'

const app = createApplication()

app.logger = createLogger()
app.use(staticServe(path.join(__dirname, '..', '..')))

app.listen(config.web.port, (err) => {
  if (err) {
    console.error(err)
  } else {
    api().then(() => {
      app.logger.info('Server is running...')
      app.logger.info('%s server listening on %s:%d...', config.api.name, config.api.host, config.api.port)
      app.logger.info('%s server listening on %s:%d...', config.web.name, config.web.host, config.web.port)
    })
  }
})
