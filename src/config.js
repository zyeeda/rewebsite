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
      name: 'Rewebsite[Dev]',
      port: parseInt(process.env.PORT) || 3000
    }
  },

  production: {
    ...baseConfig,
    app: {
      ...baseConfig.app,
      key: 'rewebsite',
      name: 'Rewebsite',
      port: parseInt(process.env.PORT) || 3000
    },
    log: {
      level: 'info'
    }
  }
}

export default specific[__DEVELOPMENT__ ? 'development' : 'production']
