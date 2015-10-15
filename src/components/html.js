import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom/server'
import serialize from 'serialize-javascript'

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.object,
    store: PropTypes.object
  }

  render() {
    const {assets, component, store} = this.props
    const viewport = component ? ReactDOM.renderToString(component) : ''

    return (
      <html lang="zh-cn">
        <head>
          <meta charSet="utf-8" />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) => {
            <link
              rel="stylesheet"
              type="text/css"
              href={assets.styles[style]}
              key={key}
              media="screen, projection" />
          })}
        </head>
        <body>
          <div id="viewport" dangerouslySetInnerHTML={{__html: viewport}} />
          <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__=${serialize(store.getState())}`}} />
          <script src={assets.javascript.main} />
        </body>
      </html>
    )
  }
}
