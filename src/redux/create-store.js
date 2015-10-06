import {combineReducers, compose, applyMiddleware, createStore} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import {reduxReactRouter as clientReduxRouter} from 'redux-router'
import {reduxReactRouter as serverReduxRouter} from 'redux-router/server'
import createHistory from 'history/lib/createBrowserHistory'

import routes from './routes'

export default (data) => {
  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const {devTools, persistState} = require('redux-devtools')
    finalCreateStore = compose(
      //applyMiddleware(promiseMiddleware),
      //devTools()
      //persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore)
  } else {
    finalCreateStore = applyMiddleware(promiseMiddleware)(createStore)
  }

  const ducks = require('./ducks')
  const rootReducer = combineReducers(ducks)
  const store = finalCreateStore(rootReducer, data)

  /*if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./ducks', () => {
      store.replaceReducer(require('./ducks'))
    })
  }*/

  return store
}
