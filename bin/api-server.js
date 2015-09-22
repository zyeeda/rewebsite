#!/usr/bin/env node

// Enable ES6 support.
require('../transpiler')

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

if (__DEVELOPMENT__) {
  if (!require('piping')({hook: true, ignore: /(\/\.|~$|\.json$)/i})) {
    return
  }
}

require('../src/api/server')
