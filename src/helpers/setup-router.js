import React from 'react'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-react-router'

export default (store) => {
  return new Promise((resolve) => {
    const component = (
      <Provider store={store} key="provider">
        <ReduxRouter />
      </Provider>
    )

    return resolve({
      component
    })
  })
}
