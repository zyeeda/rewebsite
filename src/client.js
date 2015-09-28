window.__SERVER__ = false

import 'babel/polyfill';

import React from 'react'
import ReactDOM from 'react-dom'

import createStore from './redux/create-store'
import createRouter from './redux/create-router'

const store = createStore()

createRouter(store).then((options) => {
  ReactDOM.render(options.component, document.querySelector('#container'))
})
