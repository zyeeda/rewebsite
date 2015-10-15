import {combineReducers, compose, applyMiddleware, createStore} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

export default ({reduxReactRouter, getRoutes, createHistory, initialState}) => {
  const middleware = [promiseMiddleware]

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const {devTools, persistState} = require('redux-devtools')
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore)
  } else {
    finalCreateStore = applyMiddleware(...middleware)(createStore)
  }

  finalCreateStore = reduxReactRouter({getRoutes, createHistory})(finalCreateStore)

  const ducks = require('./ducks')
  const rootReducer = combineReducers(ducks)
  const store = finalCreateStore(rootReducer, initialState)

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./ducks', () => {
      store.replaceReducer(require('./ducks'))
    })
  }

  return store
}
