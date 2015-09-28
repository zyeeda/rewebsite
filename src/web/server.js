import path from 'path'
import staticServe from 'koa-static'
import React from 'react'
import PrettyError from 'pretty-error'
import createLocation from 'history/lib/createLocation'

import createApplication from '../application'
import createLogger from '../logger'
import proxy from './proxy'
import config from '../config'
import {ServerAgent} from '../helpers/api-agent'
import createStore from '../redux/create-store'
import createRouter from '../redux/create-router'

import Html from '../components/html'

const pretty = new PrettyError()
const app = createApplication(config.web)

const logger = app.logger = createLogger(config.web.key)
app.use(staticServe(path.join(__dirname, '..', '..', 'static')))

app.use(proxy(config.web.apiServerPrefix))

const hydrate = (store, component) => {
  if (!component) component = (<div id="container" />)
  return ('<!doctype html>\n' +
    React.renderToString(
      <Html
        assets={webpackIsomorphicTools.assets()}
        component={component}
        store={store} />))
}

app.use(function* (next) {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh()
  }

  const agent = new ServerAgent(this.req)
  const store = createStore()

  logger.debug('__DISABLE_SSR__ = %s', __DISABLE_SSR__)
  if (__DISABLE_SSR__) {
    // no server-side rendering now
    this.body = hydrate(store)
    return
  }

  logger.debug('request url = %s', this.url)
  createRouter(this.url, store)
    .then(({component, redirectLocation}) => {
      if (redirectLocation) {
        this.res.redirect(redirectLocation.pathname + redirectLocation.search)
        return
      }

      this.body = hydrate(store, component)
    })
    .catch((err) => {
      if (err.redirect) {
        this.res.redirect(err.redirect)
        return
      }
      console.error('ROUTER ERROR:', pretty.render(err))
      this.body = hydrate(store)
    })
})

app.listen(config.web.port, (err) => {
  if (err) {
    console.error(pretty.render(err))
    return
  }

  app.logger.info('%s server is listening on port %d...', config.web.name, config.web.port)
})
