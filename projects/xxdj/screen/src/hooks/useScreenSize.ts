import { useMemo } from "react"
import { useWindowSize, WindowSize } from "./useWindowSize"
import { useRatioSize } from "./useRatioSize"

interface ScreenSize extends WindowSize {}

export const useScreenSize = () => {
    const { width, height } = useWindowSize()
    const { width: computedWidth, height: computedHeight } = useRatioSize({ width, height })
    
    const screenSize: ScreenSize = useMemo(() => {
        if (computedHeight <= height) {
            return { width, height: computedHeight }
        } else {
            return { width: computedWidth, height }
        }
    }, [width, height])
    return screenSize
}