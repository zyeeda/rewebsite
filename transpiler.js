// Enables ES6 support.
require('babel/register')({
  stage: 0,
  ignore: /node_modules/,
  plugins: ['typecheck']
})
