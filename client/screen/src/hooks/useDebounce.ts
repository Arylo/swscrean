export function useDebounce<F extends (...args: any[]) => void>(func: F, delay: number) {
    let timerId: NodeJS.Timeout
    const newFunc: any = function (...args: any[]) {
        const context = globalThis

        timerId && clearTimeout(timerId)

        timerId = setTimeout(() => {
            func.apply(context, args)
        }, delay)
    }
    return newFunc as F
}
