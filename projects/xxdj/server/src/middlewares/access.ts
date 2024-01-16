import { Middleware } from 'koa'
import { customAlphabet } from 'nanoid'
import { accessAsyncLocalStorage } from '../common/access'
import logger from '../utils/logger'

const nanoid = customAlphabet('1234567890ABCDEF', 8)

export function Access () {
  const mw: Middleware = async (ctx, next) => {
    const startTime = Date.now()
    const requestId = nanoid()
    await accessAsyncLocalStorage.run({ startTime, requestId }, async () => {
      logger.info(`[${ctx.method}] ${ctx.url}...`)
      await next()
      logger.info(`[${ctx.method}] ${ctx.url}... ${ctx.status}`)
    })
    ctx.set('x-request-id', requestId)
  }
  return mw
}
