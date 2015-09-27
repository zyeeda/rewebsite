import {combineReducers, compose, applyMiddleware, createStore} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import {reduxReactRouter as clientReduxRouter} from 'redux-router'
import {reduxReactRouter as serverReduxRouter} from 'redux-router/server'
import createHistory from 'history/lib/createBrowserHistory'

import routes from '../routes'

export default (data) => {
  const ducks = require('./ducks')
  const rootReducer = combineReducers(ducks)

  const store = compose(
    applyMiddleware(promiseMiddleware),
    __SERVER__ ?
      serverReduxRouter({routes}) :
      clientReduxRouter({routes, createHistory})
  )(createStore)(rootReducer, data)

  return store
}
