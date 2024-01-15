import path from 'path'
import Server from 'koa'
import router from './route'
import proxy from 'koa-proxies'
import { Mount } from './middlewares/mount'
import { Access } from './middlewares/access'

const port = process.env.INTL_PORT ? Number(process.env.INTL_PORT)
  : (process.env.PORT ? Number(process.env.PORT) : 3000)

const app = new Server()

if (process.env.NODE_ENV === 'DEBUG') {
  app.use(proxy(`/screen`, {
    target: `http://127.0.0.1:10080/`,
    changeOrigin: true,
  }))
}

app.use(Access())

const staticPath = path.resolve(__dirname, '../public/static')
const publicPath = path.resolve(__dirname, '../public')

app.use(Mount({
  prefix: '/static',
  path: staticPath,
  indexJSON: true,
}))

app.use(Mount({
  path: publicPath,
}))

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, '0.0.0.0', () => {
  console.log(`listening port ${port}`)
})
