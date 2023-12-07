import path from 'path'
import Server from 'koa'
import router from './route'
import proxy from 'koa-proxies'
import { Mount } from './middlewares/mount'

const port = process.env.INTL_PORT ? Number(process.env.INTL_PORT)
  : (process.env.PORT ? Number(process.env.PORT) : 3000)

const app = new Server()

const map = {
  screen: 10080,
  controller: 10081,
}

;(['screen', 'controller'].forEach((p: any) => {
  app.use(proxy(`/${p}`, {
    target: `http://127.0.0.1:${(map as any)[p]}/`,
    changeOrigin: true,
  }))
}))

const publicPath = path.resolve(__dirname, '../public')

app.use(Mount({
  prefix: '/assets',
  path: publicPath,
}))

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, '0.0.0.0', () => {
  console.log(`listening port ${port}`)
})