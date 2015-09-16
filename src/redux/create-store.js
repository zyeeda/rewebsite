import {combineReducers, compose, applyMiddleware, createStore} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import {reduxReactRouter} from 'redux-react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import createMemoryHistory from 'history/lib/createMemoryHistory'

import routes from '../routes'

export default (data) => {
  const ducks = require('./ducks')
  const rootReducer = combineReducers(ducks)

  const store = compose(
    applyMiddleware(promiseMiddleware),
    reduxReactRouter({
      routes,
      createHistory: (__SERVER__ ? createMemoryHistory : createBrowserHistory)
    })
  )(createStore)(rootReducer, data)

  return store

  /*let finalCreateStore = applyMiddleware(promiseMiddleware)(createStore)
  const reducers = require('./ducks')
  const store = finalCreateStore(combineReducers(reducers), data)
  return store*/
}
