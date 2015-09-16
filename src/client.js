window.__SERVER__ = false

import 'babel/polyfill';

import React from 'react'
import ReactDOM from 'react-dom'

import createStore from './redux/create-store'
import setupRouter from './helpers/setup-router'

const store = createStore()

setupRouter(store).then((options) => {
  ReactDOM.render(options.component, document.querySelector('#container'))
})
