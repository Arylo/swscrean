import { accessAsyncLocalStorage } from '../common/access'

function getCallAccessPrefix () {
  const { requestId } = accessAsyncLocalStorage.getStore() || {}
  return requestId ? `[${requestId}]` : '[System]'
}

function getCallTimePrefix () {
  const { startTime = Date.now() } = accessAsyncLocalStorage.getStore() || {}
  return `[${Date.now() - startTime}]`
}

export function debug (...args: Parameters<typeof console.log>) {
  console.log(`${getCallAccessPrefix()}${getCallTimePrefix()}`, ...args)
}

export function info (...args: Parameters<typeof console.info>) {
  console.info(`${getCallAccessPrefix()}${getCallTimePrefix()}`, ...args)
}

export function warn (...args: Parameters<typeof console.warn>) {
  console.warn(`${getCallAccessPrefix()}${getCallTimePrefix()}`, ...args)
}

export function error (...args: Parameters<typeof console.error>) {
  console.error(`${getCallAccessPrefix()}${getCallTimePrefix()}`, ...args)
}

export default {
  debug,
  info,
  warn,
  error,
}
