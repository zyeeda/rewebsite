import koa from 'koa'
import fs from 'fs'

import config from './config'
import createLogger from './logger'
import app from './application'
import rootRouter from './routers'

app.logger = createLogger()


app.use(rootRouter.routes())

app.listen(config.app.port, () => {
  app.logger.info('%s server listening on port %d...', config.app.name, config.app.port)
})
