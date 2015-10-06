import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {IndexLink, Link} from 'react-router'

@connect(
    state => ({user: state.user}))
export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    user: React.PropTypes.object,
    history: React.PropTypes.object
  };

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

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
