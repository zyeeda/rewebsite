// Enable runtime ES6/7 support.

var fs = require('fs')

var config = {}
try {
  config = JSON.parse(fs.readFileSync('./.babelrc'))
} catch (err) {
  console.error('Error parsing .babelrc.')
  console.error(err)
}

require('babel/register')(config)
