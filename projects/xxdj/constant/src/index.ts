export const STATIC_URL_PREFIX = '/static'

export const SERVER_PORT = process.env.INTL_PORT ? Number(process.env.INTL_PORT)
  : (process.env.PORT ? Number(process.env.PORT) : 8080)

export default {
  STATIC_URL_PREFIX,
  SERVER_PORT,
}
