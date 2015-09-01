import path from 'path'

const baseConfig = {
  app: {
    root: path.normalize(path.join(__dirname, '..')),
    host: 'localhost'
  },
  log: {
    level: 'debug'
  }
}

const specific = {
  development: {
    ...baseConfig,
    app: {
      ...baseConfig.app,
      key: 'rewebsite-dev',
      name: 'Rewebsite - Dev',
      port: 3001
    }
  },

  test: {
    ...baseConfig,
    app: {
      ...baseConfig.app,
      key: 'rewebsite-test',
      name: 'Rewebsite - Test',
      port: 3010
    }
  },

  production: {
    ...baseConfig,
    app: {
      ...baseConfig.app,
      key: 'rewebsite',
      name: 'Rewebsite',
      port: process.env.PORT || 3001
    },
    log: {
      level: 'info'
    }
  }
}

export default specific[__ENVIRONMENT__]
