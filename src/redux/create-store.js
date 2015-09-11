import {createStore, applyMiddleware, compose} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

export default function createReduxStore(data) {
  let finalCreateStore = applyMiddleware(promiseMiddleware)(createStore)
  const reducer = require('./ducks')
  const store = finalCreateStore(reducer, data)
  return store
}
