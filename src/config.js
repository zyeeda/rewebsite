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
      port: 3000
    }
  },

  test: {
    ...baseConfig,
    app: {
      ...baseConfig.app,
      key: 'rewebsite-test',
      name: 'Rewebsite - Test',
      port: 3001
    }
  },

  production: {
    ...baseConfig,
    app: {
      ...baseConfig.app,
      key: 'rewebsite',
      name: 'Rewebsite',
      port: process.env.PORT || 3000
    },
    log: {
      level: 'info'
    }
  }
}

export default specific[__ENVIRONMENT__]
