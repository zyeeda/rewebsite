import React, {Component, PropTypes} from 'react'

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object
  }

  render() {
    const {assets} = this.props

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
          <div id="container" />
          <script src={assets.javascript.main} />
        </body>
      </html>
    )
  }
}
