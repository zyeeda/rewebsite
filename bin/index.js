require('babel/register')({
  ignore: /node_modules/,
  stage: 0
})

global.__CLIENT__ = false
global.__SERVER__ = true
delete global.__BROWSER__

global.__ENVIRONMENT__ = process.env.NODE_ENV || 'development'
global.__DEVELOPMENT__ = global.__TEST__ = global.__PRODUCTION__ = false;
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

require('../src/server.js')
