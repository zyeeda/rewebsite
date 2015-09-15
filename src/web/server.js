import path from 'path'
import staticServe from 'koa-static'
import React from 'react'
import PrettyError from 'pretty-error'

import createApplication from '../application'
import createLogger from '../logger'
import proxy from './proxy'
import startApiServer from '../api/server'
import config from '../config'
import {ServerAgent} from '../helpers/api-agent'
import createReduxStore from '../redux/create-store'

import Html from '../components/html'

const pretty = new PrettyError()
const app = createApplication(config.web)

app.logger = createLogger(config.web.key)
app.use(staticServe(path.join(__dirname, '..', '..', 'static')))

app.use(proxy(config.web.apiServerPrefix))

app.use(function* (next) {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh()
  }

  const agent = new ServerAgent(this.req)
  const store = createReduxStore()

  // no server-side rendering now
  this.body = ('<!doctype html>\n' +
    React.renderToString(
      <Html
        assets={webpackIsomorphicTools.assets()}
        component={<div id="container" />}
        store={store} />))
})

app.listen(config.web.port, (err) => {
  if (err) {
    console.error(pretty.render(err))
  } else {
    startApiServer().then(() => {
      app.logger.info('Server is running...')
      app.logger.info('%s server listening on %s:%d...', config.api.name, config.api.host, config.api.port)
      app.logger.info('%s server listening on %s:%d...', config.web.name, config.web.host, config.web.port)
    })
  }
})
