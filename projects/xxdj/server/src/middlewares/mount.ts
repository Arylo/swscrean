import { Middleware } from "koa"
import { glob } from 'glob'
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

export function Mount (opts: MountMWOptions) {
    const {
        prefix = '/',
        path: folderPath,
        indexJSON = false,
    } = opts
    const etagMw = KoaEtag()
    const staticMw = KoaStatic(folderPath, { defer: true })
    const mw: Middleware = async (ctx, next) => {
        if (indexJSON && yn(ctx.query.index)) {
            const list = glob.sync('**/*.*', { cwd: folderPath })
            ctx.body = list.map((p) => {
                return {
                    md5sum: md5File.sync(path.resolve(folderPath, p)),
                    path: path.resolve(prefix, p),
                }
            })
            ctx.status = 200
            return next()
        }
        await etagMw(ctx, () => staticMw(ctx, next))
    }
    return KoaMount(prefix, mw)
}
