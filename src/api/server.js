import config from '../config'
import createLogger from '../logger'
import createApplication from '../application'

import rootRouter from './routers'

const app = createApplication()

app.logger = createLogger()
app.use(rootRouter.routes())

export default () => {
  return new Promise((resolve, reject) => {
    app.listen(config.api.port, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
