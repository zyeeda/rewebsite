var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var webpackConfig = require('./config-dev')

var host = webpackConfig.host
var port = webpackConfig.port

var serverConfig = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true},
  historyApiFallback: true
}

var server = new WebpackDevServer(webpack(webpackConfig), serverConfig)
server.listen(port, host, function () {
  console.info('Webpack dev server listening on %s:%d', host, port)
})
