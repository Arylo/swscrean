import { useEffect, useRef, useState } from "react"
import { useThrottle } from "./useThrottle"

export interface WindowSize {
    width: number,
    height: number,
}

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight,
    })
    const refreshWindowSize = useThrottle(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }, 16)
    const handle = useRef(() => {
        refreshWindowSize()
    })
    useEffect(() => {
        window.addEventListener('resize', handle.current)
        return () => {
            window.removeEventListener('resize', handle.current)
        }
    }, [])
    return windowSize
}