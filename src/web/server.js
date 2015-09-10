import path from 'path'
import staticServe from 'koa-static'
import React from 'react'

import createApplication from '../application'
import createLogger from '../logger'
import proxy from './proxy'
import startApiServer from '../api/server'
import config from '../config'

import Html from '../components/html'

const app = createApplication(config.web)

app.logger = createLogger(config.web.key)
app.use(staticServe(path.join(__dirname, '..', '..', 'static')))

app.use(proxy('/api'))

app.use(function* (next) {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh()
  }

  // no server-side rendering now
  this.body = ('<!doctype html>\n' +
    React.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={<div id="container" />} />))
})

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
