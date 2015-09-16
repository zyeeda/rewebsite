import React from 'react'
import {connect} from 'react-redux'
import {IndexLink, Link} from 'react-router'

@connect(
  state => ({routerState: state.router})
)
export default class App extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/" onlyActiveOnIndex={true}>Dashboard</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/tasks">Tasks</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
