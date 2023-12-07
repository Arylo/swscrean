import { createContext, useContext, useEffect, useState } from "react";

interface PagerContextContent {
    index: number,
    setIndex: (index: number) => any,
    nextIndex: number,
    prev: () => any,
    next: () => any,
    jump: (index: number) => any,
}

const noop = () => undefined

const context = createContext<PagerContextContent>({ index: 0, setIndex: noop, nextIndex: 0, prev: noop, next: noop, jump: noop })

export const useProvider = () => {
    const Comp = context.Provider
    const [index, setIndex] = useState(0)
    const [nextIndex, setNextIndex] = useState(0)
    const prev = () => index === nextIndex && setNextIndex(index - 1)
    const next = () => index === nextIndex && setNextIndex(index + 1)
    const jump = (index: number) => setNextIndex(index)
    useEffect(() => {
        setNextIndex(index)
    }, [index])
    return [Comp, { index, setIndex: (i: number) => setIndex(i), nextIndex, prev, next, jump }] as [typeof Comp, PagerContextContent]
}

export const useValue = () => {
    const value = useContext(context)
    return {
        ...value,
        init() {
            value.setIndex(0)
            value.jump(0)
        },
    }
}