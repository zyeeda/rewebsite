#!/usr/bin/env node

// Enable ES6 support.
require('../transpiler')

var path = require('path')

// Define isomorphic constants.
global.__CLIENT__ = false
global.__SERVER__ = true
global.__DISABLE_SSR__ = false // disable server side rendering for debugging
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

if (__DEVELOPMENT__) {
  if (!require('piping')({hook: true, ignore: /(\/\.|~$|\.json|\.scss$)/i})) {
    return
  }
}

var rootDir = path.resolve(__dirname, '..')
var WebpackIsomorphicTools = require('webpack-isomorphic-tools')
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools-config'))
  .development(__DEVELOPMENT__)
  .server(rootDir, function() {
    require('../src/web/server')
  })
