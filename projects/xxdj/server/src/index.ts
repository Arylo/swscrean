import path from 'path'
import Server from 'koa'
import { STATIC_URL_PREFIX } from '@xxdj/constant'
import router from './route'
import { Mount } from './middlewares/mount'
import { Access } from './middlewares/access'
import logger from './utils/logger'
import { accessAsyncLocalStorage } from './common/access'

const port = process.env.INTL_PORT ? Number(process.env.INTL_PORT)
  : (process.env.PORT ? Number(process.env.PORT) : 3000)

const app = new Server()

accessAsyncLocalStorage.run({ startTime: Date.now() }, () => {
  app.use(Access())

  const staticPath = path.resolve(__dirname, '../public/static')
  app.use(Mount({
    prefix: STATIC_URL_PREFIX,
    path: staticPath,
    indexJSON: true,
  }))
  logger.info(`mount ${staticPath} => ${STATIC_URL_PREFIX}`)

  const publicPath = path.resolve(__dirname, '../public')
  app.use(Mount({
    path: publicPath,
  }))
  logger.info(`mount ${publicPath} => /`)

  app
    .use(router.routes())
    .use(router.allowedMethods())

  app.listen(port, '0.0.0.0', () => {
    logger.info(`listening port ${port}`)
  })
})
