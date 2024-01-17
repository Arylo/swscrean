import { createContext, useContext, useState } from 'react'
import { RouteKey } from '../../../constant'

interface RouterContextContent {
    key: RouteKey,
    args: any,
    go: (key: RouteKey, args?: object) => any,
}

const context = createContext<RouterContextContent>({ go: () => undefined, key: RouteKey.PRELOAD, args: {} })

export const useProvider = () => {
    const [key, setKey] = useState(RouteKey.PRELOAD)
    const [args, setArgs] = useState({})
    const Comp = context.Provider
    const value = {
        key,
        args,
        go(key: RouteKey, args?: any) {
            setKey(key)
            args && setArgs(args || {})
        }
    }
    return [Comp, value] as [typeof Comp, RouterContextContent]
}

export const useValue = () => {
    const { key, args } = useContext(context)
    return { key, args }
}

export const useGoPage = () => {
    const { go } = useContext(context)
    return go
}
