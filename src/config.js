import path from 'path'

const baseConfig = {
  web: {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT) || 3000
  },
  api: {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT) + 1 || 3001
  },
  webpack: {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT) || 3030
  },
  log: {
    level: 'debug'
  }
}

const specific = {
  development: {
    ...baseConfig,
    web: {
      ...baseConfig.web,
      key: 'rewebsite-dev',
      name: 'reWebsite [DEV] WEB'
    },
    api: {
      ...baseConfig.api,
      key: 'reWebsite-dev-api',
      name: 'reWebsite [DEV] API'
    }
  },

  production: {
    ...baseConfig,
    web: {
      ...baseConfig.web,
      key: 'rewebsite',
      name: 'reWebsite'
    },
    api: {
      ...baseConfig.api,
      key: 'reWebsite-api',
      name: 'reWebsite API'
    },
    log: {
      level: 'info'
    }
  }
}

export default specific[__DEVELOPMENT__ ? 'development' : 'production']
