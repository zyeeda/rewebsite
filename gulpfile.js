var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var livereload = require('gulp-livereload')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var gutil = require('gulp-util')

gulp.task('server', function () {
  // listen for changes
  livereload.listen()

  nodemon().on('readable', function () {
    this.stdout.on('data', function (chunk) {
      process.stdout.write(chunk)
      if (/server listening on port/.test(chunk)) {
        livereload.reload()
      }
    })

    this.stderr.on('data', function (chunk) {
      process.stderr.write(chunk)
    })
  })
})

gulp.task('dev-server', function (callback) {
  var webpackConfig = require('./webpack/dev.config')

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

  var webpackDevServer = new WebpackDevServer(webpack(webpackConfig), serverConfig)
  webpackDevServer.listen(port, host, function (err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    gutil.log('[webpack-dev-server]', 'listening on ' + host + ':' + port + '...')
  })
})

gulp.task('build', function (callback) {
  var config = require('./webpack/dev.config')
  webpack(config, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      colors: true
    }))
    callback()
  })
})
