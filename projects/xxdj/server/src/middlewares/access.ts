import { Middleware } from 'koa'
import { customAlphabet } from 'nanoid'
import { accessAsyncLocalStorage } from '../common/access'
import logger from '../utils/logger'

const nanoid = customAlphabet('1234567890ABCDEF', 8)

export function Access () {
  const mw: Middleware = async (ctx, next) => {
    const startTime = Date.now()
    let sessionId = ctx.headers['x-session-id'] as string
    if (!sessionId || sessionId.replace(/[^0-9A-F]/gi, '').length !== 8) sessionId = nanoid()
    const requestId = nanoid()
    await accessAsyncLocalStorage.run({ startTime, sessionId, requestId }, async () => {
      logger.info(`[${ctx.method}] ${ctx.url}...`)
      await next()
      logger.info(`[${ctx.method}] ${ctx.url}... ${ctx.status}`)
    })
    ctx.set('x-session-id', sessionId)
    ctx.set('x-request-id', requestId)
  }
  return mw
}
