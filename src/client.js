import 'babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/lib/createBrowserHistory'
import {Provider} from 'react-redux'
import {reduxReactRouter, ReduxRouter} from 'redux-router'

import createStore from './redux/create-store'
import getRoutes from './redux/get-routes'

const store = createStore({
  reduxReactRouter,
  getRoutes,
  createHistory,
  initialState: __INITIAL_STATE__
})

const component = (
  <Provider store={store} key="provider">
    <ReduxRouter routes={getRoutes(store)} />
  </Provider>
)

const viewport = document.querySelector('#viewport')
ReactDOM.render(component, viewport)

if (__DEVELOPMENT__) {
  window.React = React; // enable debugger

  if (!viewport || !viewport.firstChild || !viewport.firstChild.attributes || !viewport.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__) {
  const {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react');
  ReactDOM.render(<div>
    {component}
    <DebugPanel top right bottom key="debugPanel">
      <DevTools store={store} monitor={LogMonitor}/>
    </DebugPanel>
  </div>, viewport);
}
