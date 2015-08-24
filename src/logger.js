import bunyan from 'bunyan'
import path from 'path'
import fs from 'fs-plus'

import config from './config'

const {name} = require('../package.json')

export default function createLogger() {
  let streams = [];

  if (!__PRODUCTION__) {
    streams.push({
      stream: process.stdout,
      level: config.log.level,
      src: true
    })
  } else {
    let logFile = path.join(config.app.root, 'logs', `${name}.log`)

    if (!fs.existsSync(logFile)) fs.writeFileSync(logFile)

    streams.push({
      type: 'rotating-file',
      path: logFile,
      period: '1d', // daily rotation
      count: 15,
      level: config.log.level
    })
  }

  let options = {
    name,
    streams
  };

  return bunyan.createLogger(options);
}
