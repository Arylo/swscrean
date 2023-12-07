export function useThrottle<F extends (...args: any[]) => void>(func: F, limit: number) {
    let previous = 0
    let self = globalThis
    let nextArgs: any[] = []
    let timerId: NodeJS.Timeout
    const fn: any = function (...args: any[]) {
        const now = Date.now()
        self = globalThis
        nextArgs = args
        if (now - previous >= limit) {
            previous = now
            func.apply(self, nextArgs)
        } else {
            timerId ? clearTimeout(timerId) : null
            timerId = setTimeout(() => {
                previous = Date.now()
                func.apply(self, nextArgs)
            }, now - previous)
        }
    }
    return fn as F
}
