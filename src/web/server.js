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

const hydrate = (initialState, component = <div />) => {
  return ('<!doctype html>\n' +
    React.renderToString(
      <Html
        assets={webpackIsomorphicTools.assets()}
        component={component}
        initialState={initialState} />))
}

app.use(function* (next) {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh()
  }

  const agent = new ServerAgent(this.req)
  const store = createStore()
  const location = createLocation(this.url)

  logger.debug('__DISABLE_SSR__ = %s', __DISABLE_SSR__)
  if (__DISABLE_SSR__) {
    // no server-side rendering now
    this.body = hydrate(store.getState())
    return
  }

  logger.debug('request url = %s', this.url)
  createRouter(location, undefined, store)
    .then(({component, redirectLocation}) => {
      if (redirectLocation) {
        this.res.redirect(redirectLocation.pathname + redirectLocation.search)
        return
      }

      const initialState = store.getState()
      logger.debug(initialState, "initial store state is")
      this.body = hydrate(initialState, component)
    })
    .catch((err) => {
      if (err.redirect) {
        this.res.redirect(err.redirect)
        return
      }
      logger.error('ROUTER ERROR:', pretty.render(err))
      this.body = hydrate(store.getState())
    })
})

app.listen(config.web.port, (err) => {
  if (err) {
    logger.error(pretty.render(err))
    return
  }

  logger.info('%s server is listening on port %d...', config.web.name, config.web.port)
})
