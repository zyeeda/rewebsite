import Router from 'koa-router'

import hello from './hello'
import users from './users'

const router = new Router({
});

router.use(function *(next) {
  this.type = 'json'
  yield next
})

router.use('/hello', hello.routes())
router.use('/users', users.routes())

export default router
