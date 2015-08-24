import Router from 'koa-router'

import hello from './hello'

const router = new Router({
  prefix: '/api'
});

router.use(function *(next) {
  this.type = 'json'
  yield next
})

router.use('/hello', hello.routes())

export default router
