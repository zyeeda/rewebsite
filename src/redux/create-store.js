import {applyMiddleware, createStore, combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

export default (data) => {
  let finalCreateStore = applyMiddleware(promiseMiddleware)(createStore)
  const reducers = require('./ducks')
  const store = finalCreateStore(combineReducers(reducers), data)
  return store
}
