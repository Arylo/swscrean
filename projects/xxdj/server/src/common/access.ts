import { AsyncLocalStorage } from 'async_hooks'

export const accessAsyncLocalStorage = new AsyncLocalStorage<{
  startTime: number,
  requestId?: string,
}>()
