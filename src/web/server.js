import path from 'path'
import staticServe from 'koa-static'
import React from 'react'
import ReactDOM from 'react-dom/server'
import PrettyError from 'pretty-error'
import createHistory from 'history/lib/createMemoryHistory'
import qs from 'query-string'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import {reduxReactRouter, match} from 'redux-router/server'

import createApplication from '../application'
import createLogger from '../logger'
import proxy from './proxy'
import config from '../config'
import {ServerAgent} from '../helpers/api-agent'
import fetchData from '../helpers/fetch-data'
import getStatusFromRoutes from '../helpers/get-status-from-routes'
import createStore from '../redux/create-store'
import getRoutes from '../redux/get-routes'
import Html from '../components/html'

const pretty = new PrettyError()
const app = createApplication(config.web)

const logger = app.logger = createLogger(config.web.key)
app.use(staticServe(path.join(__dirname, '..', '..', 'static')))

app.use(proxy(config.web.apiServerPrefix))

const hydrate = (store, component) => {
  return ('<!doctype html>\n' +
    ReactDOM.renderToString(
      <Html
        assets={webpackIsomorphicTools.assets()}
        component = {component}
        store={store} />))
}

app.use(function* (next) {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh()
  }

  const agent = new ServerAgent(this.req)
  const store = createStore({reduxReactRouter, getRoutes, createHistory})

  logger.debug('__DISABLE_SSR__ = %s', __DISABLE_SSR__)
  if (__DISABLE_SSR__) {
    // no server-side rendering
    this.body = hydrate(store)
    return
  }

  logger.debug('originalUrl = %s', this.originalUrl)
  store.dispatch(match(this.originalUrl, (err, redirectLocation, routerState) => {
    if (err) {
      logger.error(err)
      this.status = 500
      this.body = hydrate(store)
      return
    }

    if (redirectLocation) {
      this.redirect(redirectLocation.pathname + redirectLocation.search)
      return
    }

    if (!routerState) {
      this.status = 500
      this.body = hydrate(store)
      return
    }

    // Workaround redux-router query string issue:
    // https://github.com/rackt/redux-router/issues/106
    if (routerState.location.search && !routerState.location.query) {
      routerState.location.query = qs.parse(routerState.location.search);
    }

    logger.debug({state: store.getState()}, 'store.getState()')
    //store.getState().router.then(() => {
      const component = (
        <Provider store={store} key="provider">
          <ReduxRouter />
        </Provider>
      )

      const status = getStatusFromRoutes(routerState.routes)
      logger.debug('redux-router matched status = %s', status)
      if (status) this.status = status
      this.body = hydrate(store, component)
    /*}).catch((err) => {
      console.error(pretty.render(err))
      this.status = 500
      this.body = hydrate(store)
    })*/
  }))
})

app.listen(config.web.port, (err) => {
  if (err) {
    logger.error(pretty.render(err))
    return
  }

  logger.info('%s server is listening on port %d...', config.web.name, config.web.port)
})
