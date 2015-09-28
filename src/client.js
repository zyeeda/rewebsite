window.__SERVER__ = false

import 'babel/polyfill';

import React from 'react'
import ReactDOM from 'react-dom'

import createStore from './redux/create-store'
import createRouter from './redux/create-router'

const store = createStore(__data__)
const url = `${document.location.pathname}?${document.location.search}`

createRouter(url, store).then(({component}) => {
  ReactDOM.render(component, document.querySelector('#container'))
})
