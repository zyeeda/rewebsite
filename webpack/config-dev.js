var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

var host = process.env.HOST || 'localhost'
var port = parseInt(process.env.PORT) || 3200

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-config'))

var babelLoaderQuery = {}
try {
  // The .babelrc file must be specified like this, not "../.babelrc".
  babelLoaderQuery = JSON.parse(fs.readFileSync('./.babelrc'))
} catch (err) {
  console.error('Error parsing .babelrc.')
  console.error(err)
}

babelLoaderQuery.plugins = babelLoaderQuery.plugins || []
babelLoaderQuery.plugins.push('react-transform')
babelLoaderQuery.extra = {
  'react-transform': [{
    target: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module']
  }]
}

module.exports = {
  host: host,
  port: port,
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/client.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static/dist'), // webpack will output files to this path
    filename: '[name]-[hash:7].js', // the final output filename to the above path
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/' // the path from where the bundle will be served
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelLoaderQuery)]},
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
