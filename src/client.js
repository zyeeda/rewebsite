import 'babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/lib/createBrowserHistory'
import createLocation from 'history/lib/createLocation'

import createStore from './redux/create-store'
import setupRouter from './redux/setup-router'

const history = createHistory()
const store = createStore(__INITIAL_STATE__)

const render = (location) => {
  console.log(location)
  return setupRouter(location, history, store)
    .then(({component}) => {
      const viewport = document.querySelector('#viewport')
      ReactDOM.render(component, viewport)
    }, (err) => {
    
    })
}

history.listen(() => {})

history.listenBefore((location, callback) => {
  render(location).then(callback)
})

render(createLocation(document.location.pathname))
