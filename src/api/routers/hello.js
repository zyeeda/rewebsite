import Router from 'koa-router'

const router = new Router()

router.get('/', function* (next) {
  this.body = {
    message: this.i18n.__('hello_world')
  }
  // this.body = fs.createReadStream('not exist')
  // throw new Error('not exist')
})

export default router
