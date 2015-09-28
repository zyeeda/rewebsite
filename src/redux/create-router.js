import React from 'react'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import {match} from 'redux-router/server'

export default (url, store) => {
  return new Promise((resolve, reject) => {
    store.dispatch(match(url, (err, redirectLocation) => {
      if (err) {
        return reject(err)
      }

      if (redirectLocation) return resolve({redirectLocation})

      const component = (
        <Provider store={store} key="provider">
          <ReduxRouter />
        </Provider>
      )

      return resolve({component})
    }))
  })
}
