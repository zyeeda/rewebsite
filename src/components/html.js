import React, {Component, PropTypes} from 'react'
import serialize from 'serialize-javascript'

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.object,
    store: PropTypes.object
  }

  render() {
    const {assets, component, store} = this.props
    const content = React.renderToString(component)

    return (
      <html lang="zh-cn">
        <head>
          <meta charSet="utf-8" />

          {Object.keys(assets.styles).map((style, i) => {
            <link
              rel="stylesheet"
              type="text/css"
              href={assets.styles[style]}
              key={i}
              media="screen, projection" />
          })}
        </head>
        <body>
          <div id="viewport" dangerouslySetInnerHTML={{__html: content}} />
          <script dangerouslySetInnerHTML={{__html: `window.__data__=${serialize(store.getState())}`}} />
          <script src={assets.javascript.main} />
        </body>
      </html>
    )
  }
}