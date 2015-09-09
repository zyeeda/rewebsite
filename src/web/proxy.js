import httpProxy from 'http-proxy'
import config from '../config'

export default (options) => {
  if (typeof options === 'string') options = { prefix: options }
  if (!options.prefix) options.prefix = '/'

  const proxyServer = httpProxy.createProxyServer({
    target: {
      host: config.api.host,
      port: config.api.port
    }
  })

  return function *proxy(next) {
    this.log.debug('request path = %s', this.path)

    if (!this.path.startsWith(options.prefix)) return yield *next

    this.path = this.path.slice(options.prefix.length)
    this.log.debug('sliced request path = %s', this.path)

    yield new Promise((resolve, reject) => {
      proxyServer.web(this.req, this.res, (err) => {
        if (err) reject(err)
      })
    })
  }
}
