import { Middleware } from "koa"
import { glob } from 'glob'
import fs from 'fs'
import path from 'path'
import yn from 'yn'
import KoaEtag from 'koa-etag'
import KoaMount from 'koa-mount'
import KoaStatic from 'koa-static'
import md5File from 'md5-file'

interface MountMWOptions {
  prefix?: string,
  path: string,
  indexJSON?: boolean,
}

export function Mount(opts: MountMWOptions) {
  const map: Record<string, { mtimeMs: number, md5sum: string }> = {}
  const {
    prefix = '/',
    path: folderPath,
    indexJSON = false,
  } = opts
  const etagMw = KoaEtag()
  const staticMw = KoaStatic(folderPath, { defer: true })
  function getMd5sum(filepath: string) {
    const fileStat = fs.statSync(filepath)
    const md5Obj = map[filepath]
    const md5sum = md5Obj && md5Obj.mtimeMs === fileStat.mtimeMs ? md5Obj.md5sum : md5File.sync(filepath)
    map[filepath] = {
      mtimeMs: fileStat.mtimeMs,
      md5sum,
    }
    return md5sum
  }
  const mw: Middleware = async (ctx, next) => {
    if (indexJSON && yn(ctx.query.index)) {
      const list = glob.sync('**/*.*', { cwd: folderPath })
      ctx.body = list.map((p) => {
        const filepath = path.resolve(folderPath, p)
        return {
          md5sum: getMd5sum(filepath),
          path: path.resolve(prefix, p),
        }
      })
      ctx.status = 200
      return next()
    }
    await etagMw(ctx, () => staticMw(ctx, next))
  }
  if (indexJSON) {
    const list = glob.sync('**/*.*', { cwd: folderPath })
    list.forEach((p) => {
      const filepath = path.resolve(folderPath, p)
      getMd5sum(filepath)
    })
  }
  return KoaMount(prefix, mw)
}
