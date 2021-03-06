import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from '../components/app'
import Dashboard from '../components/dashboard'
import User from '../components/user'
import Task from '../components/task'

export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="users" component={User} />
      <Route path="tasks" component={Task} />
    </Route>
  )
}
