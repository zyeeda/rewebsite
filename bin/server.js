#!/usr/bin/env node

// Enable ES6 support.
require('../transpiler')

var path = require('path')
var rootDir = path.resolve(__dirname, '..')

// Define isomorphic constants.
global.__CLIENT__ = false
global.__SERVER__ = true
global.__DISABLE_SSR__ = false // disable server side rendering for debugging
delete global.__BROWSER__

global.__ENVIRONMENT__ = process.env.NODE_ENV || 'development'
global.__DEVELOPMENT__ = global.__TEST__ = global.__PRODUCTION__ = false
switch (__ENVIRONMENT__) {
  case 'test':
    __TEST__ = true
  break
  case 'production':
    __PRODUCTION__ = true
  break
  default:
    __DEVELOPMENT__ = true
  break
}

require('../src/server')

/*var WebpackIsomorphicTools = require('webpack-isomorphic-tools')
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools-config'))
	.development(__DEVELOPMENT__)
	.server(rootDir, function() {
		require('../src/server')
	})*/
