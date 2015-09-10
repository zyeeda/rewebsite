import React, {Component, PropTypes} from 'react'

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.object
  }

  render() {
    const {assets, component} = this.props
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
          <script src={assets.javascript.main} />
        </body>
      </html>
    )
  }
}
