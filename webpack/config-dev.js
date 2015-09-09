var webpack = require('webpack')
var path = require('path')

var host = process.env.HOST || 'localhost'
var port = parseInt(process.env.PORT) || 3030

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-config'))

module.exports = {
  host: host,
  port: port,
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-dev-server/client?http://' + host + ':' + port,
      'webpack/hot/only-dev-server',
      './src/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static/dist'), // webpack will output files to this path
    filename: 'bundle.js',
    //filename: '[name]-[hash].js', // the final output filename to the above path
    publicPath: 'http://' + host + ':' + port + '/dist/' // the path from where the bundle will be served
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel?stage=0&optional=runtime&plugins=typecheck']},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'},
      {test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240'}
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // hot reload
    //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.IgnorePlugin(/\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true // can disable redux-devtools here
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
}
