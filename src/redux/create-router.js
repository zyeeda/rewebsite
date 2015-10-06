import React from 'react'
import {Provider} from 'react-redux'
import match from 'react-router/lib/match'
import RoutingContext from 'react-router/lib/RoutingContext'

import createRoutes from './routes'

const createComponent = (store, renderProps) => {
  return (
    <Provider store={store} key="provider">
      <RoutingContext {...renderProps} />
    </Provider>
  )
}

export default (location, history, store) => {
  return new Promise((resolve, reject) => {
    match({routes: createRoutes(history), history, location}, (err, redirectLocation, renderProps) => {
      if (err) return reject(err)

      if (redirectLocation) return resolve({redirectLocation})

      const component = createComponent(store, renderProps)
      return resolve({component})
    })
  })
}
